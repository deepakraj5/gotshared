import { injectable } from "inversify";
import { AppDataStore } from "../config/db/pg.config";
import { User } from "../entity/User";
import { Repository } from "typeorm";

@injectable()
export class UserRepo {
    constructor() {}

    public userRepo(): Repository<User> {
        return AppDataStore.getRepository(User)
    }
}
