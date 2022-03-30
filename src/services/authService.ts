import { userService } from './userService';
import { IUser } from '../entity';
import { tokenService } from './tokenService';
import { emailService } from './emailService';
import { EmailActionEnum } from '../constants';

class AuthService {
    public async registration(user:IUser) {
        const { email } = user;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }

        const createUser = await userService.createUser(user);
        await emailService.sendMail(EmailActionEnum.SUCCESS_REGISTERED, email);
        return this._getTokenData(createUser);
    }

    private async _getTokenData(userData:IUser) {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(tokenPair.refreshToken, id, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
