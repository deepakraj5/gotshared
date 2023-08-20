import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { Upload } from "../../entity/Upload";
import { User } from "../../entity/User";

dotenv.config()

export const AppDataStore = new DataSource({
    type: 'postgres',
    url: process.env.PG_URI,
    logging: false,
    entities: [Upload, User],
    synchronize: true
})
