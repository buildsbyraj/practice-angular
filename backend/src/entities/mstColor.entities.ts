import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('mst_color')

export class mstColorEntity{
    @PrimaryGeneratedColumn({type:"int"})
    id!:number;

    @Column({type:"varchar"})
    name!:string
}