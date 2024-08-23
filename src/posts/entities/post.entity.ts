import { Exclude } from "class-transformer";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    content: string;

    @Column('text')
    temathicArea: string;

    @ManyToOne(() => User, user => user.posts,{eager: true})
    user: User;

    @ManyToOne(() => Category, category => category.posts, {eager: true})
    category: Category;

    @Column('boolean', {default: true})
    isPublished: boolean;
    
    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[];
    
    @CreateDateColumn()
    @Exclude({'toPlainOnly': true})
    createdAt: Date;

    @CreateDateColumn()
    @Exclude({'toPlainOnly': true})
    updatedAt: Date;


};
