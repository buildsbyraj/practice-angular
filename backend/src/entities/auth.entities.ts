import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('auth')

export class authEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    email!:string

    @Column({type:'varchar'})
    password!:string
}


