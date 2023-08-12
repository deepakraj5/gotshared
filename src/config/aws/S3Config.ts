import { S3, S3ClientConfig } from "@aws-sdk/client-s3";

const s3ClientConfig: S3ClientConfig = {
    credentials: {
        accessKeyId: 'AKIAZ2EXJLUFUNKQGJWB',
        secretAccessKey: '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'
    },
    region: 'ap-south-1'
}

export const S3Config = new S3(s3ClientConfig)
