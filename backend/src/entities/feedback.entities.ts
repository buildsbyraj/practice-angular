import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('feedback')

export class feedbackEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    name!:string

    @Column({type:'varchar'})
    email!:string

    @Column({type:'int'})
    rating!:number

    @Column({type:'varchar'})
    feedback!:string
}


