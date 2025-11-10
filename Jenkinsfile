pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/LithilKimar/WelcomeApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t welcomeapp:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop welcomeapp-container || exit 0
                docker rm welcomeapp-container || exit 0
                docker run -d -p 5173:80 --name welcomeapp-container welcomeapp:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! App is running at http://localhost:5173'
        }
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
    }
}
