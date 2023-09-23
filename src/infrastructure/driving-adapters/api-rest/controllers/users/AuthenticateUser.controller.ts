import { Request, Response, NextFunction } from 'express';
import { UserAuthenticatorUseCase } from '@application/usescases/users/UserAuthenticator';
import { DynamoDBUserRepository } from '@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository';
import { BcryptAdapter } from '@infrastructure/driven-adpters/auth/BcryptAdapter';
import { JwtAdapter } from '@infrastructure/driven-adpters/auth/JwtAdapter';


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const {email,password} = req.body

    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const bcryptAdapter = new BcryptAdapter()
    const jwtAdapter = new JwtAdapter()

    const userAuthenticatorUseCase = new UserAuthenticatorUseCase(dynamoDBUserRepo,bcryptAdapter,jwtAdapter)

    try {
        const token = await userAuthenticatorUseCase.authenticate(email,password)
        console.log(token)
        res.status(200).json({token})
        return
    }catch (error) {
            next(error)
        }
}