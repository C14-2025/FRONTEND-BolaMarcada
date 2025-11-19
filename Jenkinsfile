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
                    echo "📥 Instalando Node localmente no workspace..."

                    if [ -d "$NODE_HOME" ]; then
                        echo "🔄 Removendo Node antigo..."
                        rm -rf $NODE_HOME
                    fi

                    mkdir -p $NODE_HOME

                    curl -fsSL https://nodejs.org/dist/v$NODE_VERSION.0/node-v$NODE_VERSION.0-linux-x64.tar.xz -o node.tar.xz
                    tar -xf node.tar.xz -C $NODE_HOME --strip-components=1

                    rm node.tar.xz

                    echo "✔️ Node instalado em $NODE_HOME"
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
                echo "📦 Salvando build para download..."
                archiveArtifacts artifacts: 'dist/**, build/**', fingerprint: true
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

