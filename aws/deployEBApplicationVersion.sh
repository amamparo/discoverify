aws elasticbeanstalk create-application-version --application-name discoverify \
  --version-label latest \
  --source-bundle S3Bucket=discoverify-api,S3Key=bundle.zip

aws elasticbeanstalk update-environment \
  --application-name discoverify \
  --envrionment-name production \
  --version-label latest