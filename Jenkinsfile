pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        sh 'docker build . -t csvmailer'
        sh 'docker volume create csvmailer_test'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'docker run -i -v csvmailer_test:/data --rm --env-file $(pwd)/.env-sample --entrypoint=node csvmailer test'
      }
    }
  }

  post {
    always {
      echo 'Cleaning up...'
      sh 'docker rmi csvmailer'
      sh 'docker volume rm csvmailer_test'
    }
  }
}
