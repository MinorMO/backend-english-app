import {v4 as uuidv4} from 'uuid';
import {Request, Response, NextFunction} from 'express';
import { UserCreatorUseCase } from '@application/usescases/users/UserCreator';
import { User } from '@domain/entities/User';
import { DynamoDBUserRepository } from '@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository';
import { BcryptAdapter } from '@infrastructure/driven-adpters/auth/BcryptAdapter';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const {
        email,
        name,
        lastName,
        password,
        role
    } = req.body
    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const bcryptAdapter = new BcryptAdapter()
    const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo,bcryptAdapter)

    const userToCreate: User = {
        id: uuidv4(),
        email,
        name,
        lastName,
        password,
        role
    }

    try {
        const userCreated = await userCreatorUseCase.run_createUser(userToCreate)
        res.status(200).json(userCreated)
        return
    } catch (error) {
        return next(error)
    }

    }