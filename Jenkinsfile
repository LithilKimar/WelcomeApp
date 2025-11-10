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
                bat 'docker build -t react-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop react-container || exit 0
                docker rm react-container || exit 0
                docker run -d -p 5173:5173 --name react-container react-app:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! App is running at http://localhost:3000'
        }
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
    }
}
