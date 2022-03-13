import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';

export interface IToken extends ICommonFields{
    refreshToken:string;
    userId:number;
}

@Entity('Tokens', { database: 'okten' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken:string;

    @Column({
        type: 'number',
    })
        userId:number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user:User;
}
