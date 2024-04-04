import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity()
export class Employee{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name:string;

    @Column()
    role:string;

    @Column()
    experience:Number;
}
