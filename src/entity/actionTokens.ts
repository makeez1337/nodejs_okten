import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';

export interface IActionToken {
    actionToken: string;
    userId:number;
}

@Entity('ActionTokens', { database: 'okten' })
export class ActionTokens extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'integer',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user:User;
}
