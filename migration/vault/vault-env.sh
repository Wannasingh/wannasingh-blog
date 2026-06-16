#!/bin/bash
# ==============================================================================
# HashiCorp Vault Secrets Injection Script
# Retrieves secrets from Vault and exposes them as env variables to the process
# ==============================================================================
set -e

if [ -n "$VAULT_ADDR" ]; then
  echo "[Vault] Address detected: $VAULT_ADDR"

  # 1. Authenticate with Vault if Token isn't already set
  # A. Production/CI: AppRole authentication
  if [ -z "$VAULT_TOKEN" ] && [ -n "$VAULT_ROLE_ID" ] && [ -n "$VAULT_SECRET_ID" ]; then
    echo "[Vault] Authenticating using AppRole..."
    VAULT_TOKEN=$(vault write -field=token auth/approle/login role_id="$VAULT_ROLE_ID" secret_id="$VAULT_SECRET_ID")
    export VAULT_TOKEN
  fi

  # B. Production: Kubernetes authentication (if applicable)
  if [ -z "$VAULT_TOKEN" ] && [ -f "/var/run/secrets/kubernetes.io/serviceaccount/token" ] && [ -n "$VAULT_K8S_ROLE" ]; then
    echo "[Vault] Authenticating using Kubernetes auth method..."
    K8S_JWT=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
    VAULT_TOKEN=$(vault write -field=token auth/kubernetes/login role="$VAULT_K8S_ROLE" jwt="$K8S_JWT")
    export VAULT_TOKEN
  fi

  # 2. Retrieve Secrets and inject them as Env Variables
  if [ -n "$VAULT_TOKEN" ]; then
    SECRET_PATH=${VAULT_SECRET_PATH:-"secret/data/wannasingh-blog"}
    echo "[Vault] Fetching credentials from KV engine path: $SECRET_PATH"

    # Fetch secrets payload in JSON format
    SECRETS_JSON=$(vault kv get -format=json "$SECRET_PATH")

    # Parse JSON values using Node.js (avoids installing jq on Alpine)
    export DB_USER=$(node -e '
      try {
        const payload = JSON.parse(process.argv[1]);
        const data = payload.data.data || payload.data;
        console.log(data.DB_USER || "");
      } catch (e) {
        process.exit(1);
      }
    ' "$SECRETS_JSON")

    export DB_PASSWORD=$(node -e '
      try {
        const payload = JSON.parse(process.argv[1]);
        const data = payload.data.data || payload.data;
        console.log(data.DB_PASSWORD || "");
      } catch (e) {
        process.exit(1);
      }
    ' "$SECRETS_JSON")

    export DB_CONNECTION_STRING=$(node -e '
      try {
        const payload = JSON.parse(process.argv[1]);
        const data = payload.data.data || payload.data;
        console.log(data.DB_CONNECTION_STRING || "");
      } catch (e) {
        process.exit(1);
      }
    ' "$SECRETS_JSON")

    export JWT_SECRET=$(node -e '
      try {
        const payload = JSON.parse(process.argv[1]);
        const data = payload.data.data || payload.data;
        console.log(data.JWT_SECRET || "");
      } catch (e) {
        process.exit(1);
      }
    ' "$SECRETS_JSON")

    echo "[Vault] Secrets successfully retrieved and injected into current environment."
  else
    echo "[Vault] Warning: VAULT_TOKEN is empty. Skipping injection."
  fi
else
  echo "[Vault] VAULT_ADDR not defined. Bypassing Vault injection."
fi

# Execute the main application command (CMD from Dockerfile)
exec "$@"
