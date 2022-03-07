import { Column, Entity, OneToMany } from 'typeorm';
import { CommonFields } from './commonFields';
import { Post } from './post';
import { Comment } from './comment';

export interface IUser {
    firstName:string;
    lastName:string;
    age?:number;
    phone:string;
    email:string;
    password:string;
}

@Entity('Users', { database: 'okten' })
export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName:string;

    @Column({
        type: 'integer',
    })
        age?: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
        phone:string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
        password: string;

    @OneToMany(() => Post, (post) => post.user)
        posts:Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
        comments:Comment[];
}
