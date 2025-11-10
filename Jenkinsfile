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
                // Using double quotes so Jenkins executes all lines correctly
                bat """
                    echo Stopping old container (if any)...
                    docker stop welcomeapp-dev || exit 0
                    docker rm welcomeapp-dev || exit 0

                    echo Starting new container...
                    docker run -d -p 5173:5173 --name welcomeapp-dev welcomeapp-dev:latest

                    echo Container started successfully.
                """
            }
        }
    }

    post {
        success {
            echo '✅ Development server running at http://localhost:5173'
        }
        failure {
            echo '❌ Build failed. Please check console output for errors.'
        }
    }
}
