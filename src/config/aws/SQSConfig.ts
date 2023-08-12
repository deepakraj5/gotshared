import { SQS, SQSClientConfig } from "@aws-sdk/client-sqs";

const sqsClientConfig: SQSClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as any,
        secretAccessKey: process.env.AWS_ACCESS_SECRET as any
    },
    region: 'ap-south-1'
}

export const SQSConfig = new SQS(sqsClientConfig)
