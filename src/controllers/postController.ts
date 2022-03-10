import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IPost } from '../entity/post';
import { postService } from '../services/postService';

class PostController {
    public async getPostById(req:Request, res:Response):Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const posts = await postService.getPostById(Number(userId));
        return res.json(posts);
    }

    public async updatePostById(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { text } = req.body;

        const updatedPost = await postService.updatePostById(Number(req.params.postId), text);
        return res.json(updatedPost);
    }
}

export const postController = new PostController();
