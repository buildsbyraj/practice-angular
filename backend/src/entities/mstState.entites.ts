import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("state")

export class stateEntity{

    @PrimaryGeneratedColumn()
    id!:number

    @Column({type:'varchar'})
    name!:string

}