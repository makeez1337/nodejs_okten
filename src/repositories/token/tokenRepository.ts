import { DeleteResult, getManager } from 'typeorm';

import { IToken, Token } from '../../entity';
import { IActionDataToSave, ITokenDataToSave } from '../../interfaces';
import { ActionTokens, IActionToken } from '../../entity/actionTokens';

class TokenRepository {
    public async createToken(token:ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async createActionToken(token:IActionDataToSave):Promise<IActionToken> {
        return getManager().getRepository(ActionTokens).save(token);
    }

    public async findTokenByUserId(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async findActionTokenByUserId(userId:number):Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionTokens).findOne({ userId });
    }

    public async deleteUserTokenPair(userId: number):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }

    public async findTokenByParams(params:Partial<IToken>):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ ...params });
    }

    public async deleteTokenPairByParam(params: Partial<IToken>) {
        return getManager().getRepository(Token).delete(params);
    }

    public async findActionTokenByParam(params: Partial<IActionToken>):Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionTokens).findOne({ ...params });
    }

    public async deleteActionTokenByParams(params: Partial<IActionToken>):Promise<DeleteResult> {
        return getManager().getRepository(ActionTokens).delete({ ...params });
    }
}

export const tokenRepository = new TokenRepository();
