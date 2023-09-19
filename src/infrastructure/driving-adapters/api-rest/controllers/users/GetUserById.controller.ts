import { NextFunction,Request,Response } from "express";
import { DynamoDBUserRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository";
import { UserGetterByIdUseCase } from "@application/usescases/users/UserGetterById";

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const dynamodbUserRepo = new DynamoDBUserRepository()
    const userGetterByIdUseCase = new UserGetterByIdUseCase(dynamodbUserRepo)

    const UserId = req.params.id

    try {
        const user = await userGetterByIdUseCase.run_UserGetterById(UserId)
        res.status(200).json(user)
        return
    } catch (error) {
        return next(error)
    }
}