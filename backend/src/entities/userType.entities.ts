import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user_type')

export class userTypeEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    lable!:string

    @Column({type:'varchar'})
    type!:string
}


