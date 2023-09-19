import { NextFunction, Request,Response } from "express";
import { DynamoDBUserRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository";
import { UserDeteleterUseCase } from "@application/usescases/users/UserDeteleter";

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    const UserId = req.params.id
    const dynamodbUserRepo = new DynamoDBUserRepository()
    const userDeteleterUseCase = new UserDeteleterUseCase(dynamodbUserRepo)

    try {
        const userDeleted = await userDeteleterUseCase.run_UserDeteleter(UserId)
        res.status(200).json(userDeleted)
        return
    } catch (error) {
        return next(error)
    }
}