import { Stack, StackProps, CfnOutput, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VPC, NewInstance } from '.';

export class InstanceExample extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const imageName = this.node.tryGetContext('imageName');

    const vpc = new VPC(this, 'VPC');
    const newInstance = new NewInstance(this, 'Instance', {
      vpc: vpc.vpc,
      securityGroup: vpc.securityGroup,
      ec2Role: vpc.ec2Role,
      imageName: imageName,
    });
    new CfnOutput(this, 'newInstanceId', { value: newInstance.instanceId });
  }
}
