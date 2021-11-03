import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Roles } from "../enums/roles";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: Roles;

}