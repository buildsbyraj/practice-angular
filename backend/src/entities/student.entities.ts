import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("student")

export class studentEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id!:number

    @Column({type:"varchar"})
    name!:string

    @Column({type:"varchar"})
    course!:string

    @Column({type:"varchar"})
    email!:string

}