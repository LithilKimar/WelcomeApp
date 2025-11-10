pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhubusername/react-app"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }

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
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                sh '''
                echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                docker push ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop react-container || true
                docker rm react-container || true
                docker run -d -p 3000:80 --name react-container ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! App is live at http://<server-ip>:3000'
        }
        failure {
            echo '❌ Build failed. Check console logs.'
        }
    }
}
