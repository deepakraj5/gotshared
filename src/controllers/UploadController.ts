import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import TYPES from "../config/inversify/types";
import { UploadService } from "../service/UploadService";
import multer from 'multer'

const upload = multer({

})

@controller('/api/v1/upload')
export class UploadController extends BaseHttpController {
    constructor(
        @inject(TYPES.UploadService) private readonly uploadService: UploadService
    ) {
        super()
    }

    @httpGet('/')
    public async getSample(@request() req: Request, @response() res: Response): Promise<any> {
        try {
            res.status(200).send({
                message: 'sample controller v1'
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal server error'
            })
        }
    }

    @httpPost('/', upload.single('file'))
    public async uploadFile(@request() req: Request,  @response() res: Response): Promise<any> {
        try {

            const { name, format, email } = req.body
            const file = req.file?.buffer as any

            console.log('Uploading to S3......')

            const uploadDetails = await this.uploadService.uploadFile({
                file,
                name,
                format,
                email
            })

            res.status(200).send({
                message: 'Upload successful',
                data: uploadDetails
            })

        } catch (error) {
            res.status(500).send({
                messgae: 'Internal server error',
                error: error
            })
        }
    }

}
