import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { taskStatusEntity } from "./mstTaskStatus.entities";
import { taskPriorityEntity } from "./mstTaskPriority.entities";


@Entity('mst_task')


export class mstTaskEntity{

    @PrimaryGeneratedColumn({type:"int"})
    id!:number;

    @Column({type:"varchar"}) 
    name!:string

    @Column({type:"int"})
    task_status_id!:number

    @Column({type:"int"})
    task_priority_id!:number

    @ManyToOne(() => taskStatusEntity)
    @JoinColumn({referencedColumnName:"id",name:"task_status_id"})
    status!:taskStatusEntity

    @ManyToOne(() => taskPriorityEntity)
    @JoinColumn({referencedColumnName:"id",name:"task_priority_id"})
    priority!:taskPriorityEntity
}