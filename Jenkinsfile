// pipeline {
//     agent {
//         docker {
//             image 'node:20'
//             args '-u root'  // garante permissão para instalar libs
//         }
//     }

//     stages {

//         stage('Clonar repositório') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/C14-2025/FRONTEND-BolaMarcada.git'
//             }
//         }

//         stage('Instalar dependências') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Build do projeto') {
//             steps {
//                 sh 'npm run build'
//             }
//         }

//     //     // Caso você tenha testes automatizados
//     //     stage('Rodar testes') {
//     //         when {
//     //             expression { fileExists('package.json') && sh(script: "grep -q \"test\" package.json", returnStatus: true) == 0 }
//     //         }
//     //         steps {
//     //             sh 'npm test'
//     //         }
//     //     }

//     //     stage('Salvar artefatos') {
//     //         steps {
//     //             archiveArtifacts artifacts: 'dist/**, build/**', fingerprint: true
//     //         }
//     //     }

// }
//     post {
//         success {
//             echo 'Pipeline finalizada com sucesso!'
//         }
//         failure {
//             echo 'Pipeline falhou 😢'
//         }
//     }
// }

pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/C14-2025/FRONTEND-BolaMarcada.git'
            }
        }

        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build do projeto') {
            steps {
                sh 'npm run build'
            }
        }
        //     // Caso você tenha testes automatizados
    //     stage('Rodar testes') {
    //         when {
    //             expression { fileExists('package.json') && sh(script: "grep -q \"test\" package.json", returnStatus: true) == 0 }
    //         }
    //         steps {
    //             sh 'npm test'
    //         }
    //     }

    //     stage('Salvar artefatos') {
    //         steps {
    //             archiveArtifacts artifacts: 'dist/**, build/**', fingerprint: true
    //         }
    //     }
    }
    post {
        success {
            echo 'Pipeline finalizada com sucesso!'
        }
        failure {
            echo 'Pipeline falhou 😢'
        }
    }
}