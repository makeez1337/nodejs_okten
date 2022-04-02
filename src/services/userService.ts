import { DeleteResult, UpdateResult } from 'typeorm';

import bcrypt from 'bcrypt';
import { userRepository } from '../repositories';
import { IUser } from '../entity';

class UserService {
    public async getUsers():Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getNewUsers():Promise<IUser[]> {
        return userRepository.getNewUsers();
    }

    public async getUserEmails() {
        return userRepository.getUserEmails();
    }

    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this.hashedPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async updateUser(password:string, email:string, id:number):Promise<UpdateResult> {
        return userRepository.updatedUser(password, email, id);
    }

    public async updateUserPassword(id:number, password:string):Promise<UpdateResult> {
        return userRepository.updateUserPassword(id, password);
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

    public async hashedPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
