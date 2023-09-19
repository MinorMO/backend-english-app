import { NextFunction,Request,Response } from "express";
import { DynamoDBVerbsRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository";
import { VerbDeleterUseCase } from "@application/usescases/verbs/VerbDeleter";

export const deleteVerb = async (req: Request, res: Response, next: NextFunction) => {

    const verbId = req.params.id;
    const dynamoDBVerbRepo = new DynamoDBVerbsRepository();
    const verbDeleterUseCase = new VerbDeleterUseCase(dynamoDBVerbRepo);

    try {
        const verbDeleted = await verbDeleterUseCase.run(verbId);
        res.status(200).json(verbDeleted);
        return;
    } catch (error) {
        return next(error);
    }
}