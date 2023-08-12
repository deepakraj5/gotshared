import { inject, injectable } from "inversify";
import TYPES from "../config/inversify/types";
import { S3Client } from "../infrastructure/service/S3Client";
import { Upload } from "../entity/Upload";
import { v4 as uuidv4 } from 'uuid'

export type UploadFileDTO = {
    file: string;
    name: string;
    format: string;
    email: string;
    userId?: string;
}

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
        
        const upload = new Upload(
            data.name, `https://get-transfer.s3.ap-south-1.amazonaws.com/${data.file}.${data.format}`, data.email
        )
        
        return await upload.save()
    }
}