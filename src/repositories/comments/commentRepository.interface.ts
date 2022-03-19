import { UpdateResult } from 'typeorm';

import { IComment } from '../../entity/comment';

export interface ICommentRepository {
    getCommentByUserId(userId:number):Promise<IComment[]>;
    updateByAction(action:string, actionId:number):Promise<UpdateResult | undefined>;
}
