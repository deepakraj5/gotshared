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

    @httpPost('/', upload.array('file'))
    public async uploadFile(@request() req: Request,  @response() res: Response): Promise<any> {
        try {

            const { email, name } = req.body
            const files = req.files as any

            const uploadDetails = await this.uploadService.uploadFile({
                files,
                email,
                name
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
