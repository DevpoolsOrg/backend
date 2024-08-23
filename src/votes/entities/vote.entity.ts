import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Vote {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.votes)
    user: User;

    @Column('text')
    voteOption: string;

    
    @ManyToOne(() => Post, post => post.votes)
    post: Post;
    


}
