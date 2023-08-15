import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('upload')
export class Upload extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'url' })
    url: string;
    
    @Column({ name: 'email' })
    email: string;

    // constructor(name: string, url: string, email: string) {
    //     super()
    //     this.name = name;
    //     this.url = url;
    //     this.email = email;
    // }
}
