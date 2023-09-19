import { NextFunction,Request,Response } from "express";
import { DynamoDBUserRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository";
import { UserGetterUseCase } from "@application/usescases/users/UserGetter";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    const dynamodbUserRepo = new DynamoDBUserRepository()
    const userGetterUseCase = new UserGetterUseCase(dynamodbUserRepo)

    try {
        const user = await userGetterUseCase.run_GetAllUsers()
        res.status(200).json(user)
        return
    } catch (error) {
        return next(error)
    }
}