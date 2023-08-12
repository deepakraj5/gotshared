import { Container } from "inversify";
import TYPES from "./types";
import { S3Client } from "../../infrastructure/service/S3Client";
import { S3ClientService } from "../../service/S3ClientService";
import { UploadService } from "../../service/UploadService";

const container = new Container()

container.bind<S3Client>(TYPES.S3ClientService)
    .to(S3ClientService).inSingletonScope()

container.bind<UploadService>(TYPES.UploadService)
    .to(UploadService).inSingletonScope()

export default container