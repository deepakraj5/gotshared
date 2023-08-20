import { inject, injectable } from "inversify";
import TYPES from "../config/inversify/types";
import { S3Client } from "../infrastructure/service/S3Client";
import { Upload } from "../entity/Upload";
import { randomUUID } from "crypto";
import { User } from "../entity/User";
import { UserRepo } from "../repo/UserRepo";
import { Repository } from "typeorm";

export type UploadFileDTO = {
    files: Express.Multer.File[];
    email: string;
    userId?: string;
    name: string;
}

const BASE_URI = `https://get-transfer.s3.ap-south-1.amazonaws.com`

@injectable()
export class UploadService {
    constructor(
        @inject(TYPES.S3ClientService) private readonly s3Client: S3Client,
        @inject(TYPES.UserRepo) private readonly userRepoProvider: UserRepo
    ) {}

    private userRepo: Repository<User>;

    private init() {
        this.userRepo = this.userRepoProvider.userRepo()
    }

    public async uploadFile(data: UploadFileDTO): Promise<any> {

        this.init()

        const user = await this.userRepo.findOneBy({ email: data.email })

        // bundle files into single folder on single upload
        const uuid = randomUUID()

        const filesUploaded: Upload[] = []

        data.files?.forEach(async file => {

            const uploads = new Upload()
            uploads.fileName = file.originalname
            uploads.fileSize = `${file.size}`
            uploads.fileType = file.mimetype
            uploads.url = `${BASE_URI}/${data.email}/${uuid}/${file.originalname}`
            uploads.zipId = uuid
            filesUploaded.push(uploads)

            if(user) {
                uploads.user = user
                await uploads.save()
            }
            
            this.s3Client.uploadObject({
                file: file.buffer as any,
                name: file.originalname,
                email: data.email,
                uuid
            })
        })

        if(!user) {
            const newUser = new User(data.name, data.email, filesUploaded)
            await newUser.save()
        }

        return filesUploaded;
    }
}
