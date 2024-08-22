import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
@PrimaryGeneratedColumn('uuid')
id : string;

@Column('text')
name: string;

@Column('text')
description: string;

@OneToMany(() => Post, post => post.category)   

    posts: Post[];

};
