import { injectable } from "inversify";
import { S3Config } from "../config/aws/S3Config";
import { S3UploadFileDTO } from "../dto/S3UploadFileDTO";
import { S3Client } from "../infrastructure/service/S3Client";

export type S3CreateBucketOptions = {
    bucket: string;
}

@injectable()
export class S3ClientService implements S3Client {
    constructor() {}

    public async uploadObject(options: S3UploadFileDTO): Promise<void> {
       try {
            const date = new Date()
            const expireDate = date.setHours(date.getHours() + 1)
            await S3Config.putObject({
                Bucket: 'get-transfer',
                Key: `${options.name}.${options.format}`,
                Body: Buffer.from(options.file, 'base64'),
                ContentEncoding: 'base64',
                Expires: new Date(expireDate)
            })
       } catch (error) {
            console.log(error)
            throw error
       }
    }
}
