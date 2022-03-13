import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
export class UsersRepository extends Repository<User> implements IUserRepository {
    public async getUsers():Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updatedUser(password:string, email:string, id:number):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id }, {
                password, email,
            });
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async deleteUser(id:number):Promise<DeleteResult> {
        return getManager()
            .getRepository(User).softDelete({ id });
    }
}

export const userRepository = new UsersRepository();
