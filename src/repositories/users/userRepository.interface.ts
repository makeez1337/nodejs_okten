import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../../entity/user';

export interface IUserRepository {
    getUsers():Promise<IUser[]>;
    createUser(user:IUser):Promise<IUser>;
    updatedUser(password:string, email:string, id:number):Promise<UpdateResult>;
    deleteUser(id:number):Promise<DeleteResult>;
}
