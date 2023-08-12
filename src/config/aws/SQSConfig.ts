import { SQS, SQSClientConfig } from "@aws-sdk/client-sqs";

const sqsClientConfig: SQSClientConfig = {
    credentials: {
        accessKeyId: 'AKIAZ2EXJLUFUNKQGJWB',
        secretAccessKey: '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'
    },
    region: 'ap-south-1'
}

export const SQSConfig = new SQS(sqsClientConfig)
