import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upload } from "./Upload";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;
    
    @Column({ name: 'email' })
    email: string;

    @OneToMany(() => Upload, (upload) => upload.user, {
        cascade: true
    })
    uploads: Upload[];

    constructor(name: string, email: string, uploads: Upload[]) {
        super()
        this.name = name;
        this.email = email;
        this.uploads = uploads
    }
}
