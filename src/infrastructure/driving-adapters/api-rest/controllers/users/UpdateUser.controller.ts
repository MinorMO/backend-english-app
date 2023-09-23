import { NextFunction,Request,Response } from "express";
import { DynamoDBUserRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository";
import { UserUpdaterUseCase } from "@application/usescases/users/UserUpdater";
import { User } from "@domain/entities/User";
import { BcryptAdapter } from '@infrastructure/driven-adpters/auth/BcryptAdapter';
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const {
        name,
        lastName,
        email,
        password,
        role
    } = req.body

    const UserId = req.params.id
    const bcryptAdapter = new BcryptAdapter()
    const dynamodbUserRepo = new DynamoDBUserRepository()
    const userUpdaterUseCase = new UserUpdaterUseCase(dynamodbUserRepo,bcryptAdapter)

    try {
        const userToUpdate : User  ={
            id: UserId,
            name,
            lastName,
            email,
            password,
            role

        }

        const user = await userUpdaterUseCase.run_updateUser(userToUpdate)
        res.status(200).json(user)
        return
    } catch (error) {
        return next(error)
    }

}
