import { Column, PrimaryGeneratedColumn, Entity, Unique } from "typeorm";
import { Roles } from "../enums/roles";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    telephoneNumber: string;

    @Column({
        default: 'user'
    })
    role: Roles;
}