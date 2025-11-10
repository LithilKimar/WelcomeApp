pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/LithilKimar/WelcomeApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t welcomeapp-dev:latest .'
            }
        }

        stage('Run Dev Container') {
            steps {
                bat '''
                docker stop welcomeapp-dev || exit 0
                docker rm welcomeapp-dev || exit 0
                docker run -d -p 5173:5173 --name welcomeapp-dev welcomeapp-dev:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Development server running at http://localhost:5173'
        }
    }
}
