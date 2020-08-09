import {App, RemovalPolicy, Stack} from '@aws-cdk/core';
import {Bucket, HttpMethods} from '@aws-cdk/aws-s3';
import {BucketDeployment, Source} from '@aws-cdk/aws-s3-deployment';
import {CfnApplication, CfnApplicationVersion, CfnEnvironment} from '@aws-cdk/aws-elasticbeanstalk';
import {ARecord, CnameRecord, HostedZone} from '@aws-cdk/aws-route53';
import {Duration} from '@aws-cdk/core/lib/duration';
import {RecordTarget} from '@aws-cdk/aws-route53/lib/record-set';
import {BucketWebsiteTarget} from '@aws-cdk/aws-route53-targets';

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {domainName: 'aaronmamparo.com'});
    this.createBackendResources({hostedZone});
    this.createFrontendResources({hostedZone});
  }
  
  createBackendResources({hostedZone}) {
    const bucket = new Bucket(this, 'BackendBucket');
    new BucketDeployment(this, 'BackendBucketDeployment', {
      destinationBucket: bucket,
      sources: [
        Source.asset('.build/server')
      ]
    });
    const application = new CfnApplication(this, 'Application', {applicationName: this.stackName});
    const applicationVersion = new CfnApplicationVersion(this, 'ApplicationVersion', {
      applicationName: application.applicationName,
      sourceBundle: {
        s3Bucket: bucket.bucketName,
        s3Key: 'bundle.zip'
      }
    });
    applicationVersion.addDependsOn(application);
    const environment = new CfnEnvironment(this, 'Environment', {
      applicationName: this.stackName,
      solutionStackName: '64bit Amazon Linux 2 v5.1.0 running Node.js 12',
      versionLabel: applicationVersion.ref,
      cnamePrefix: this.stackName,
      removalPolicy: RemovalPolicy.DESTROY,
      optionSettings: [
        {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'IamInstanceProfile',
          value: 'ecsInstanceRole'
        }
      ]
    });
    environment.addDependsOn(application);
    environment.addDependsOn(applicationVersion);
    
    new CnameRecord(this, 'BackendCNameRecord', {
      domainName: `${this.stackName}.us-east-1.elasticbeanstalk.com`,
      zone: hostedZone,
      recordName: 'discoverify-api.aaronmamparo.com',
      ttl: Duration.seconds(60)
    });
  }
  
  
  createFrontendResources({hostedZone}) {
    const frontendDomain = 'discoverify.aaronmamparo.com';
    const bucket = new Bucket(this, 'FrontendBucket', {
      bucketName: frontendDomain,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
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
        Source.asset('.build/client')
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