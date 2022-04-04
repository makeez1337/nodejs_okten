import {
    DeleteResult,
    EntityRepository, getManager, MoreThan, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponce } from '../../interfaces';

dayjs.extend(utc);

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

    public async updateUserPassword(id: number, password: string):Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id }, { password });
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

    // public async getNewUsers():Promise<IUser[]> {
    //     return getManager().getRepository(User).createQueryBuilder('user')
    //         .where('user.createdAt >= :data', { data: dayjs().utc().startOf('day').format() })
    //         .getMany();
    // }

    public async getNewUsers():Promise<IUser[]> {
        return getManager().getRepository(User).find({
            where: {
                createdAt: MoreThan(dayjs().utc().startOf('day').format()),
            },
        });
    }

    public async getUserEmails() {
        return getManager().getRepository(User).createQueryBuilder('user')
            .select('user.email')
            .distinct(true)
            .getRawMany();
    }

    public async getUserPagination(
        page:number,
        limit:number,
        searchObject:Partial<IUser> = {},
    ):Promise<IPaginationResponce<IUser>> {
        const skip = limit * (page - 1);

        const [users, itemsCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemsCount,
            data: users,
        };
    }
}

export const userRepository = new UsersRepository();
