import { IPost } from '../../entity/post';

export interface IPostRepository {
    getPostById(userId:number):Promise<IPost[]>;
}
