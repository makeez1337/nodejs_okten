import { UpdateResult } from 'typeorm';
import { IComment } from '../entity/comment';
import { commentRepository } from '../repositories/comments/commentRepository';

class CommentService {
    public async getCommentByUserId(userId:number):Promise<IComment[]> {
        const comments = commentRepository.getCommentByUserId(userId);
        return comments;
    }

    public async updateByAction(action:string, actionId:number):Promise<UpdateResult | undefined> {
        const updatedComment = await commentRepository.updateByAction(action, actionId);
        return updatedComment;
    }
}

export const commentService = new CommentService();
