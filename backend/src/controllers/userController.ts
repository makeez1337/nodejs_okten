import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { userService } from '../services';

export class UserController {
    public async getUsers(req:Request, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .innerJoin('Posts', 'posts', 'posts.userId = user.id')
        //     .getMany();

        return res.json(users);
    }

    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const newUser = await userService.createUser(req.body);
        return res.json(newUser);
    }

    public async updateUser(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { password, email } = req.body;
        console.log(req.body);

        const updatedUser = await userService.updateUser(password, email, Number(req.params.id));
        return res.json(updatedUser);
    }

    public async deleteUser(req:Request, res:Response)
        :Promise<Response<DeleteResult>> {
        const deletedUser = await userService.deleteUser(Number(req.params.id));
        return res.json(deletedUser);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;

        const user = userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
