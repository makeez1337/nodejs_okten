import { DeleteResult, UpdateResult } from 'typeorm';

import { userRepository } from '../repositories/users/usersRepository';
import { IUser } from '../entity/user';

class UserService {
    public async getUsers():Promise<IUser[]> {
        const users = await userRepository.getUsers();
        return users;
    }

    public async createUser(user:IUser):Promise<IUser> {
        const newUser = await userRepository.createUser(user);
        return newUser;
    }

    public async updateUser(password:string, email:string, id:number):Promise<UpdateResult> {
        const updatedUser = await userRepository.updatedUser(password, email, id);
        return updatedUser;
    }

    public async deleteUser(id:number):Promise<DeleteResult> {
        const deletedUser = await userRepository.deleteUser(id);

        return deletedUser;
    }
}

export const userService = new UserService();
