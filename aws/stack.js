import {App, RemovalPolicy, Stack} from '@aws-cdk/core';
import {Bucket, HttpMethods} from '@aws-cdk/aws-s3';
import {BucketDeployment, Source} from '@aws-cdk/aws-s3-deployment';
import {ARecord, HostedZone} from '@aws-cdk/aws-route53';
import {Duration} from '@aws-cdk/core/lib/duration';
import {RecordTarget} from '@aws-cdk/aws-route53/lib/record-set';
import {BucketWebsiteTarget} from '@aws-cdk/aws-route53-targets';

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {domainName: 'aaronmamparo.com'});
    const frontendDomain = 'discoverify.aaronmamparo.com';
    const bucket = new Bucket(this, 'FrontendBucket', {
      bucketName: frontendDomain,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      removalPolicy: RemovalPolicy.DESTROY,
      cors: [
        {
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ['*']
        }
      ]
    });
    new BucketDeployment(this, 'FrontendBucketDeployment', {
      destinationBucket: bucket,
      sources: [
        Source.asset('.build')
      ]
    });
    new ARecord(this, 'FrontendARecord', {
      target: new RecordTarget([], new BucketWebsiteTarget(bucket)),
      zone: hostedZone,
      recordName: frontendDomain,
      ttl: Duration.seconds(60)
    });
  }
}

(() => {
  const app = new App();
  new MyStack(app, 'discoverify', {env: {account: '388646735826', region: 'us-east-1'}});
  app.synth();
})();