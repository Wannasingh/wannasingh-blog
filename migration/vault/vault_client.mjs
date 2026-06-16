/**
 * Programmatic Vault secrets retrieval helper
 * Useful as a runtime fallback/direct client when running outside containerized environments
 */
export async function loadVaultSecrets() {
  const vaultAddr = process.env.VAULT_ADDR;
  const vaultToken = process.env.VAULT_TOKEN;
  const secretPath = process.env.VAULT_SECRET_PATH || "secret/data/wannasingh-blog";

  if (!vaultAddr) {
    console.log("[Vault-Client] VAULT_ADDR not defined. Using local environment variables.");
    return;
  }

  if (!vaultToken) {
    console.warn("[Vault-Client] VAULT_TOKEN is missing. Cannot fetch secrets programmatically.");
    return;
  }

  try {
    // Oracle DB Connect Strings and App credentials path
    const url = `${vaultAddr}/v1/${secretPath}`;
    
    console.log(`[Vault-Client] Fetching secrets from Vault API: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Vault-Token": vaultToken
      }
    });

    if (!response.ok) {
      throw new Error(`Vault API responded with status ${response.status}`);
    }

    const body = await response.json();
    const secrets = body.data.data || body.data;

    if (secrets) {
      // Inject keys into process.env
      Object.keys(secrets).forEach(key => {
        process.env[key] = secrets[key];
      });
      console.log("[Vault-Client] Secrets programmatically injected into process.env");
    }
  } catch (err) {
    console.error("[Vault-Client] Error retrieving secrets programmatically:", err.message);
    throw err;
  }
}

export default loadVaultSecrets;
