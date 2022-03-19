import { DeleteResult, UpdateResult } from 'typeorm';

import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/users/usersRepository';
import { IUser } from '../entity/user';

class UserService {
    public async getUsers():Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashedPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async updateUser(password:string, email:string, id:number):Promise<UpdateResult> {
        return userRepository.updatedUser(password, email, id);
    }

    public async deleteUser(id:number):Promise<DeleteResult> {
        return userRepository.deleteUser(id);
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPaswords(password:string, hash:string):Promise<void | Error> {
        const isPasswordsEqual = await bcrypt.compare(password, hash);

        if (!isPasswordsEqual) {
            throw new Error('Email or password is not valid');
        }
    }

    private async _hashedPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
