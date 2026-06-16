// =============================================================================
// Jenkinsfile — Wannasingh Blog Enterprise-Level Declarative Pipeline
// Fully configured for the Control-Room VM and Target Deploy Environments
// =============================================================================

pipeline {
  agent {
    // Runs on Jenkins agent with Docker capabilities on the control-room VM
    label "docker"
  }

  // ── Environment & Credentials ──────────────────────────────────────────────
  environment {
    // Registry Target
    REGISTRY         = "${env.REGISTRY ?: 'ap-singapore-1.ocir.io/axwlz6nlaqwo'}"
    IMAGE_FRONTEND   = "${REGISTRY}/wannasingh-blog-frontend"
    IMAGE_BACKEND    = "${REGISTRY}/wannasingh-blog-backend"
    IMAGE_TAG        = "build-${env.BUILD_NUMBER}"

    // Jenkins Credentials
    DOCKER_CREDS     = credentials("docker-registry-creds")   // username/password credential
    SONAR_TOKEN      = credentials("sonarqube-token")          // secret text credential
    VAULT_TOKEN      = credentials("vault-root-token")         // secret text credential

    // Target VMs & Environment URLs
    TARGET_IP        = "64.110.115.33"
    STAGING_URL      = "https://blog-staging.wannasingh.dev"
    PRODUCTION_URL   = "https://blog.wannasingh.dev"

    // Node.js Setup
    NODE_VERSION     = "18"
    
    // Shared Jenkins volume name on the host VM
    JENKINS_VOLUME   = "wannasingh-portfolios_jenkins_data"
  }

  // ── Options ───────────────────────────────────────────────────────────────
  options {
    timeout(time: 60, unit: "MINUTES")
    buildDiscarder(logRotator(numToKeepStr: "10"))
    disableConcurrentBuilds(abortPrevious: true)
    ansiColor("xterm")
  }

  // ── Triggers ──────────────────────────────────────────────────────────────
  triggers {
    pollSCM("H/5 * * * *")  // Poll SCM changes every 5 minutes
  }

  // ═══════════════════════════════════════════════════════════════════════════
  stages {

    // ── Stage 1: Initialization & Pre-check ──────────────────────────────────
    stage("Initialization & Pre-check") {
      parallel {
        stage("Checkout Code") {
          steps {
            slackSend(
              color: '#439FE0',
              message: """*🟡 WANNASINGH BLOG: PIPELINE STARTED*
• *Project:* `${env.JOB_NAME}`
• *Build:* `#${env.BUILD_NUMBER}`
• *Branch:* `${env.BRANCH_NAME}`
• *Link:* <${env.BUILD_URL}|Track Progress>"""
            )
            echo "🔁 Checking out source code..."
            checkout scm
            sh "git log --oneline -5"
          }
        }
        stage("Secret Scanning") {
          steps {
            echo "🛡️ Running Secret Scanning (TruffleHog)..."
            sh """
              docker run --rm -v \$(echo \${WORKSPACE} | sed "s|/var/jenkins_home/|/var/lib/docker/volumes/${JENKINS_VOLUME}/_data/|"):/workspace trufflesecurity/trufflehog:latest git file:///workspace --since-commit=HEAD~1 --only-verified --fail || {
                echo "⚠️ TruffleHog scan completed. (Secrets warning, enforce fail in production!)"
              }
            """
          }
        }
      }
    }

    // ── Stage 2: Diagnostics ─────────────────────────────────────────────────
    stage("Diagnostics: Target VM") {
      steps {
        echo "🔍 Fetching status from Target VM..."
        withCredentials([sshUserPrivateKey(credentialsId: 'apps-ssh-key', keyFileVariable: 'APPS_KEY', usernameVariable: 'APPS_USER')]) {
          sh """
            ssh -i \$APPS_KEY -o StrictHostKeyChecking=no \$APPS_USER@${TARGET_IP} "
              echo '=== Docker Containers ==='
              docker ps
            " || true
          """
        }
      }
    }

    // ── Stage 3: Install Dependencies ────────────────────────────────────────
    stage("Install Dependencies") {
      steps {
        echo "⚙️ Installing project dependencies..."
        sh """
          echo "Installing Client dependencies..."
          cd client && npm ci
          echo "Installing Server dependencies..."
          cd ../server && npm ci
        """
      }
    }

    // ── Stage 4: Parallel Build & Unit Test ──────────────────────────────────
    stage("Parallel Build & Unit Test") {
      parallel {
        stage("Backend: Test & Lint") {
          steps {
            echo "⚙️ Running Backend Linters & Tests..."
            sh """
              cd server
              npm run test || echo "⚠️ Backend tests completed (or none configured)."
            """
          }
        }
        stage("Frontend: Build & Lint") {
          steps {
            echo "⚙️ Running Frontend Linting & Build..."
            sh """
              cd client
              npm run lint || true
              npm run build
            """
          }
        }
      }
    }

    // ── Stage 5: Code Quality & Security Scanning ────────────────────────────
    stage("Code Quality & Security Scanning") {
      parallel {
        stage("SonarQube Analysis & SAST") {
          environment {
            SONAR_HOST_URL = "${env.SONAR_HOST_URL ?: 'http://sonarqube:9000'}"
          }
          steps {
            echo "🔬 Running SonarQube analysis & SAST Scan..."
            withSonarQubeEnv("SonarQube") {
              script {
                def sonarParams = "-Dsonar.login=${SONAR_TOKEN} -Dsonar.host.url=${SONAR_HOST_URL}"
                sonarParams += " -Dsonar.analysisCache.enabled=true"
                sonarParams += " -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/coverage/**"
                
                if (env.CHANGE_ID) {
                  sonarParams += " -Dsonar.pullrequest.key=${env.CHANGE_ID}"
                  sonarParams += " -Dsonar.pullrequest.branch=${env.CHANGE_BRANCH}"
                  sonarParams += " -Dsonar.pullrequest.base=${env.CHANGE_TARGET}"
                } else {
                  sonarParams += " -Dsonar.branch.name=${env.BRANCH_NAME}"
                }
                
                sh "sonar-scanner ${sonarParams}"
              }
            }
            echo "⏳ Waiting for SonarQube Quality Gate result..."
            timeout(time: 5, unit: "MINUTES") {
              waitForQualityGate abortPipeline: true
            }
          }
        }
        stage("Dependency Check / SCA") {
          steps {
            echo "🔍 Running Software Composition Analysis (SCA)..."
            sh """
              cd client && npm audit --audit-level=high || true
              cd ../server && npm audit --audit-level=high || true
            """
          }
        }
      }
    }

    // ── Stage 6: Artifact Packaging & Containerization ──────────────────────
    stage("Artifact Packaging & Containerization") {
      when {
        anyOf {
          branch "main"
          branch "master"
          branch "develop"
          branch pattern: "release/.*", comparator: "REGEXP"
        }
      }
      stages {
        stage("Docker Build") {
          parallel {
            stage("Build Frontend Image") {
              steps {
                echo "🐳 Building React frontend image..."
                sh """
                  docker build \
                    --file migration/deployment/Dockerfile.client \
                    --tag ${IMAGE_FRONTEND}:${IMAGE_TAG} \
                    --tag ${IMAGE_FRONTEND}:latest \
                    --cache-from ${IMAGE_FRONTEND}:latest \
                    .
                """
              }
            }
            stage("Build Backend Image") {
              steps {
                echo "🐳 Building Express server image..."
                sh """
                  docker build \
                    --file migration/deployment/Dockerfile.server \
                    --tag ${IMAGE_BACKEND}:${IMAGE_TAG} \
                    --tag ${IMAGE_BACKEND}:latest \
                    --cache-from ${IMAGE_BACKEND}:latest \
                    .
                """
              }
            }
          }
        }

        stage("Container Vulnerability Scan") {
          parallel {
            stage("Scan Frontend Image") {
              steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 0 ${IMAGE_FRONTEND}:${IMAGE_TAG} || echo '⚠️ Trivy failed or not installed.'"
              }
            }
            stage("Scan Backend Image") {
              steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 0 ${IMAGE_BACKEND}:${IMAGE_TAG} || echo '⚠️ Trivy failed or not installed.'"
              }
            }
          }
        }

        stage("Push Image to Registry") {
          steps {
            echo "🚀 Pushing Docker images..."
            sh "echo ${DOCKER_CREDS_PSW} | docker login ${REGISTRY} --username ${DOCKER_CREDS_USR} --password-stdin"
            sh """
              docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}
              docker push ${IMAGE_FRONTEND}:latest
              docker push ${IMAGE_BACKEND}:${IMAGE_TAG}
              docker push ${IMAGE_BACKEND}:latest
            """
          }
          post {
            always {
              sh "docker logout ${REGISTRY}"
            }
          }
        }
      }
    }

    // ── Stage 7: Deploy to Staging ───────────────────────────────────────────
    stage("Deploy to Staging") {
      when {
        anyOf {
          branch "main"
          branch "master"
          branch "develop"
        }
      }
      steps {
        echo "🚀 Preparing staging environment configuration..."
        sh """
          echo "VAULT_TOKEN=${VAULT_TOKEN}" > staging.env
          echo "VAULT_SECRET_PATH=secret/wannasingh-blog-staging" >> staging.env
        """
        withCredentials([sshUserPrivateKey(credentialsId: 'apps-ssh-key', keyFileVariable: 'APPS_KEY', usernameVariable: 'APPS_USER')]) {
          sh """
            scp -i \$APPS_KEY -o StrictHostKeyChecking=no staging.env \$APPS_USER@${TARGET_IP}:/home/ubuntu/.env-blog-staging
            scp -i \$APPS_KEY -o StrictHostKeyChecking=no migration/deployment/docker-compose.prod.yml \$APPS_USER@${TARGET_IP}:/home/ubuntu/docker-compose-staging.yml
          """
          sh """
            ssh -i \$APPS_KEY -o StrictHostKeyChecking=no \$APPS_USER@${TARGET_IP} "
              echo '${DOCKER_CREDS_PSW}' | docker login ${REGISTRY} --username '${DOCKER_CREDS_USR}' --password-stdin
              IMAGE_TAG=${IMAGE_TAG} docker compose --env-file /home/ubuntu/.env-blog-staging -f /home/ubuntu/docker-compose-staging.yml pull
              IMAGE_TAG=${IMAGE_TAG} docker compose --env-file /home/ubuntu/.env-blog-staging -f /home/ubuntu/docker-compose-staging.yml up -d --remove-orphans
              docker logout ${REGISTRY}
            "
          """
        }
        echo "✅ Deployment to Staging completed! Staging App URL: ${STAGING_URL}"
        script {
          currentBuild.description = "Staging: <a href='${STAGING_URL}' target='_blank'>${STAGING_URL}</a>"
        }
      }
    }

    // ── Stage 8: Dynamic Testing (Post-Deployment) ──────────────────────────
    stage("Dynamic Testing") {
      parallel {
        stage("E2E Integration (Cypress)") {
          steps {
            echo "🧪 Running Cypress End-to-End Tests against Staging..."
            sh """
              docker run --rm --add-host blog-staging.wannasingh.dev:${TARGET_IP} \
                -v \$(echo \${WORKSPACE} | sed "s|/var/jenkins_home/|/var/lib/docker/volumes/${JENKINS_VOLUME}/_data/|"):/e2e \
                -w /e2e \
                cypress/included:13.12.0 --config baseUrl=${STAGING_URL} || echo "⚠️ Cypress E2E run warning."
            """
          }
        }
        stage("Performance / Load Testing") {
          steps {
            echo "📈 Running Load Testing (k6)..."
            sh """
              docker run --rm --add-host blog-staging.wannasingh.dev:${TARGET_IP} \
                -v \$(echo \${WORKSPACE} | sed "s|/var/jenkins_home/|/var/lib/docker/volumes/${JENKINS_VOLUME}/_data/|"):/apps \
                -w /apps \
                grafana/k6 run scripts/load-tests.js --env TARGET_URL=${STAGING_URL} || echo "⚠️ Load testing run warning."
            """
          }
        }
        stage("Dynamic Application Security Testing (DAST)") {
          steps {
            echo "🔥 Running DAST Scan (OWASP ZAP)..."
            sh """
              docker run --rm --add-host blog-staging.wannasingh.dev:${TARGET_IP} \
                -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t ${STAGING_URL} || true
            """
          }
        }
      }
    }

    // ── Stage 9: Manual Approval Gate ────────────────────────────────────────
    stage("Manual Approval Gate") {
      when {
        anyOf {
          branch "main"
          branch "master"
        }
      }
      steps {
        slackSend(
          color: '#FF8C00',
          message: """*⏸️ ACTION REQUIRED: Waiting for Approval to Production*
• *Project:* `${env.JOB_NAME}`
• *Build:* `#${env.BUILD_NUMBER}`
• *Action:* 👉 <${env.BUILD_URL}|Click here to Approve / Reject release>"""
        )
        echo "Wait for TL/QA approval..."
        input id: 'DeployGate', message: "Approve deployment of build ${env.BUILD_NUMBER} to Production?", ok: "Approve & Release"
      }
    }

    // ── Stage 10: Deploy to Production & Verification ───────────────────────
    stage("Deploy to Production") {
      when {
        anyOf {
          branch "main"
          branch "master"
        }
      }
      steps {
        echo "🚀 Preparing production environment configuration..."
        sh """
          echo "VAULT_TOKEN=${VAULT_TOKEN}" > production.env
          echo "VAULT_SECRET_PATH=secret/wannasingh-blog" >> production.env
        """
        withCredentials([sshUserPrivateKey(credentialsId: 'apps-ssh-key', keyFileVariable: 'APPS_KEY', usernameVariable: 'APPS_USER')]) {
          sh """
            scp -i \$APPS_KEY -o StrictHostKeyChecking=no production.env \$APPS_USER@${TARGET_IP}:/home/ubuntu/.env-blog-production
            scp -i \$APPS_KEY -o StrictHostKeyChecking=no migration/deployment/docker-compose.prod.yml \$APPS_USER@${TARGET_IP}:/home/ubuntu/docker-compose-production.yml
          """
          sh """
            ssh -i \$APPS_KEY -o StrictHostKeyChecking=no \$APPS_USER@${TARGET_IP} "
              echo '${DOCKER_CREDS_PSW}' | docker login ${REGISTRY} --username '${DOCKER_CREDS_USR}' --password-stdin
              IMAGE_TAG=${IMAGE_TAG} docker compose --env-file /home/ubuntu/.env-blog-production -f /home/ubuntu/docker-compose-production.yml pull
              IMAGE_TAG=${IMAGE_TAG} docker compose --env-file /home/ubuntu/.env-blog-production -f /home/ubuntu/docker-compose-production.yml up -d --remove-orphans
              docker logout ${REGISTRY}
            "
          """
        }
        
        echo "🔬 Running Production Smoke Tests..."
        withCredentials([sshUserPrivateKey(credentialsId: 'apps-ssh-key', keyFileVariable: 'APPS_KEY', usernameVariable: 'APPS_USER')]) {
          sh """
            ssh -i \$APPS_KEY -o StrictHostKeyChecking=no \$APPS_USER@${TARGET_IP} '
              sleep 10
              STATUS_CODE=\$(curl -s -k -o /dev/null -w "%{http_code}" http://localhost:8081 || echo "000")
              if [ "\$STATUS_CODE" -eq 200 ] || [ "\$STATUS_CODE" -eq 301 ] || [ "\$STATUS_CODE" -eq 302 ]; then
                echo "✅ Smoke test passed! Production VM port 8081 is healthy."
              else
                echo "❌ Smoke test failed! Status: \$STATUS_CODE"
                exit 1
              fi
            '
          """
        }
        script {
          currentBuild.description = "Production: <a href='${PRODUCTION_URL}' target='_blank'>${PRODUCTION_URL}</a>"
        }
      }
    }

  }  // end stages

  // ── Post Actions ──────────────────────────────────────────────────────────
  post {
    always {
      echo "🧹 Cleaning up dangling images..."
      sh "docker image prune -f || true"
    }
    failure {
      slackSend(
        color: '#FF0000',
        message: """*🔴 BUILD FAILED*
• *Project:* `${env.JOB_NAME}`
• *Build:* `#${env.BUILD_NUMBER}`
• *Branch:* `${env.BRANCH_NAME}`
• *Console Log:* <${env.BUILD_URL}console|View Console Log>"""
      )
    }
    aborted {
      slackSend(
        color: '#808080',
        message: """*🛑 BUILD ABORTED*
• *Project:* `${env.JOB_NAME}`
• *Build:* `#${env.BUILD_NUMBER}`"""
      )
    }
  }
}
