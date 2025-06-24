import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("task_status")

export class taskStatusEntity{

    @PrimaryGeneratedColumn({type:'int'})
    id!:number

    @Column({type:"varchar"})
    name!:string
}