import { S3, S3ClientConfig } from "@aws-sdk/client-s3";

const s3ClientConfig: S3ClientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as any,
        secretAccessKey: process.env.AWS_ACCESS_SECRET as any
    },
    region: 'ap-south-1'
}

export const S3Config = new S3(s3ClientConfig)
