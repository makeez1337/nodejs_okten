import { UpdateResult } from 'typeorm';

import { IPost } from '../entity/post';
import { postRepository } from '../repositories/posts/postRepository';

class PostService {
    public async getPostById(userId:number):Promise<IPost[]> {
        const posts = await postRepository.getPostById(userId);
        return posts;
    }

    public async updatePostById(id:number, text:string):Promise<UpdateResult> {
        const updatedPost = postRepository.updatePostById(id, text);
        return updatedPost;
    }
}

export const postService = new PostService();
