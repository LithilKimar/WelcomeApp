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
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop react-container || true
                docker rm react-container || true
                docker run -d -p 3000:80 --name react-container react-app:latest
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
