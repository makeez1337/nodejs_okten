import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPostById(userId:number):Promise<IPost[]> {
        return getManager()
            .getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :userId', { userId })
            .getMany();
    }

    public async updatePostById(id:number, text:string):Promise<UpdateResult> {
        return getManager()
            .getRepository(Post)
            .update({ id }, { text });
    }
}

export const postRepository = new PostRepository();
