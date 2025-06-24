import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')

export class usersEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    user!:string

    @Column({type:'varchar'})
    email!:string

    @Column({type:'int'})
    number!:number

    @Column({type:'varchar'})
    skill!:string
}


