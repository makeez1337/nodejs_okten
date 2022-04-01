import jwt from 'jsonwebtoken';

import { DeleteResult } from 'typeorm';
import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';
import { ITokenPair, IUserPayload } from '../interfaces';
import { IActionToken } from '../entity/actionTokens';

class TokenService {
    public generateTokenPair(payload:IUserPayload):ITokenPair {
        const accessToken = jwt.sign(
            payload,
config.SECRET_ACCESS_KEY as string,
{ expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
config.SECRET_REFRESH_KEY as string,
{ expiresIn: config.EXPIRES_IN_REFRESH },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    public generateActionToken(payload:IUserPayload):string {
        return jwt.sign(payload, config.SECRET_ACTION_KEY as string, { expiresIn: config.EXPIRES_IN_ACTION });
    }

    public async saveActionToken(actionToken: string, userId:number):Promise<IActionToken> {
        const tokenFromDb = await tokenRepository.findActionTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.actionToken = actionToken;
            return tokenRepository.createActionToken(tokenFromDb);
        }

        return tokenRepository.createActionToken({ actionToken, userId });
    }

    public async saveToken(refreshToken:string, userId:number, accessToken:string):Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, userId, accessToken });
    }

    public async deleteUserTokenPair(userId:number):Promise<DeleteResult> {
        return tokenRepository.deleteUserTokenPair(Number(userId));
    }

    public async deleteTokenPairByParam(params:Partial<IToken>):Promise<DeleteResult> {
        return tokenRepository.deleteTokenPairByParam(params);
    }

    public async deleteActionTokenByParam(params:Partial<IActionToken>):Promise<DeleteResult> {
        return tokenRepository.deleteActionTokenByParams({ ...params });
    }

    public async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_KEY;
        }
        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
