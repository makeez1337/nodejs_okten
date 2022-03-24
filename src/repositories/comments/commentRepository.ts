import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { Comment, IComment } from '../../entity';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getCommentByUserId(userId:number):Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :userId', { userId })
            .innerJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async updateByAction(action:string, actionId:number):Promise<UpdateResult | undefined> {
        if (action === 'dislike') {
            return getManager().getRepository(Comment)
                .increment({ id: Number(actionId) }, 'dislikes', '1');
        }

        if (action === 'like') {
            return getManager().getRepository(Comment)
                .increment({ id: Number(actionId) }, 'likes', '1');
        }
    }
}

export const commentRepository = new CommentRepository();
