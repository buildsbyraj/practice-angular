import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('designation')

export class formArrayEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    skill_1!:string

    @Column({type:'varchar'})
    skill_2!:string

    @Column({type:'varchar'})
    skill_3!:string

    @Column({type:'varchar'})
    skill_4!:string

    @Column({type:'varchar'})
    skill_5!:string
}


