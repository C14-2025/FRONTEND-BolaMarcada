pipeline { 
    agent any

    environment {
        NODE_VERSION = "20"
        NODE_HOME = "$WORKSPACE/node"
        PATH = "$NODE_HOME/bin:$PATH"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📦 Clonando repositório Frontend..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/C14-2025/FRONTEND-BolaMarcada.git',
                        // credentialsId: 'PAT_Jenkins'   // se usar repo privado, descomente
                    ]]
                ])
            }
        }

        stage('Setup Node Environment') {
            steps {
                echo "🟦 Baixando Node $NODE_VERSION..."

                sh '''
                    echo "📥 Preparando ambiente..."

                    # Instalar xz-utils para extrair .tar.xz
                    apt-get update && apt-get install -y xz-utils

                    echo "📥 Instalando Node localmente..."

                    if [ -d "$NODE_HOME" ]; then
                        rm -rf $NODE_HOME
                    fi

                    mkdir -p $NODE_HOME

                    NODE_VERSION_FULL="${NODE_VERSION}.0.0"

                    # Baixar Node
                    curl -fsSL https://nodejs.org/dist/v$NODE_VERSION_FULL/node-v$NODE_VERSION_FULL-linux-x64.tar.xz -o node.tar.xz

                    # Extrair Node
                    tar -xf node.tar.xz -C $NODE_HOME --strip-components=1
                    rm node.tar.xz

                    echo "✔️ Node instalado com sucesso!"
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📚 Instalando dependências (npm install)..."
                sh '''
                    npm install
                '''
            }
        }

        stage('Build Project') {
            steps {
                echo "🏗️ Rodando build do React (npm run build)..."
                sh '''
                    npm run build
                '''
            }
        }

        stage('Run Tests') {
            when {
                expression { fileExists('package.json') && sh(script: "grep -q \"test\" package.json", returnStatus: true) == 0 }
            }
            steps {
                echo "🧪 Executando testes..."
                sh '''
                    npm test --if-present
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "📦 Armazenando artefatos do build e relatórios..."
                archiveArtifacts artifacts: '.next/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline do Frontend finalizado com sucesso!"
        }
        failure {
            echo "❌ Pipeline falhou! Veja os logs ☝️"
        }
    }
}

