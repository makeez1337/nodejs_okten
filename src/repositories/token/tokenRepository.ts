import { DeleteResult, getManager } from 'typeorm';

import { IToken, Token } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

class TokenRepository {
    public async createToken(token:ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
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
}

export const tokenRepository = new TokenRepository();
