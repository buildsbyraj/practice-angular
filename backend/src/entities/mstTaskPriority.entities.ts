import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("task_priority")

export class taskPriorityEntity{

    @PrimaryGeneratedColumn({type:'int'})
    id!:number

    @Column({type:"varchar"})
    name!:string
}