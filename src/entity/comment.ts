import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Post } from './post';

interface IComment {
    text: string;
    authorId: number;
    postId: number;
    likes: number;
    dislikes: number;
}

@Entity('Comments', { database: 'okten' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text:string;

    @Column({
        type: 'integer',
        nullable: false,
    })
        authorId:number;

    @Column({
        type: 'integer',
        nullable: false,
    })
        postId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
        likes: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
        dislikes: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user:User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post:Post;
}
