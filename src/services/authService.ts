import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(user:IUser) {
        const { email } = user;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }

        const createUser = await userService.createUser(user);
        return this._getTokenData(createUser);
    }

    private async _getTokenData(userData:IUser) {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(tokenPair.refreshToken, id);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
