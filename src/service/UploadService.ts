import { inject, injectable } from "inversify";
import TYPES from "../config/inversify/types";
import { S3Client } from "../infrastructure/service/S3Client";
import { Upload } from "../entity/Upload";

export type UploadFileDTO = {
    file: string;
    name: string;
    format: string;
    email: string;
    userId?: string;
}

const BASE_URI = `https://get-transfer.s3.ap-south-1.amazonaws.com`

@injectable()
export class UploadService {
    constructor(
        @inject(TYPES.S3ClientService) private readonly s3Client: S3Client
    ) {}

    public async uploadFile(data: UploadFileDTO): Promise<Upload> {
        await this.s3Client.uploadObject({
            file: data.file,
            format: data.format,
            name: data.name
        })
        
        const upload = new Upload()

        upload.name = data.name
        upload.url = `${BASE_URI}/${data.name}`
        upload.email = data.email

        return await upload.save()
    }
}
