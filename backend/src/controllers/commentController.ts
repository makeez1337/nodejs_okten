import { Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IComment } from '../entity';
import { commentService } from '../services';

class CommentController {
    public async getCommentByUserId(req:Request, res:Response):Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentByUserId(Number(userId));
        return res.json(comments);
    }

    public async updateByAction(req:Request, res:Response)
        :Promise<Response<UpdateResult> | undefined> {
        const { actionId, action } = req.body;

        const updatedComment = await commentService.updateByAction(action, actionId);
        return res.json(updatedComment);
    }
}

export const commentController = new CommentController();
