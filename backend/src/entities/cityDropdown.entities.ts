import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('city_dropdown')

export class citDropDownEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({type:'varchar'})
    city_name!:string
}


