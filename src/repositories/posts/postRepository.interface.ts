import { IPost } from '../../entity';

export interface IPostRepository {
    getPostById(userId:number):Promise<IPost[]>;
}
