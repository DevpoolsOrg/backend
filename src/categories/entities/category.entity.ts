import { Column, PrimaryGeneratedColumn } from "typeorm";


export class Category {
@PrimaryGeneratedColumn('uuid')
id : string;

@Column('text')
nombre: string;

@Column('text')
descripcion: string;

};
