import { S3UploadFileDTO } from "../../dto/S3UploadFileDTO";

export interface S3Client {
    uploadObject(options: S3UploadFileDTO): Promise<void>
}
