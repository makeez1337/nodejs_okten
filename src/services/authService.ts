import { IUser } from '../entity';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(createdUser:IUser) {
        return this._getTokenData(createdUser);
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
