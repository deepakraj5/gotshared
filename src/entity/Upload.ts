import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('upload')
export class Upload extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'file_size' })
    fileSize: string;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'file_type' })
    fileType: string;

    @Column({ name: 'zip_id' })
    zipId: string;

    @ManyToOne(() => User, (user) => user.uploads)
    user: User;
}
