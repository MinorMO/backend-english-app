import { NextFunction, Request, Response } from "express";
import { DynamoDBVerbsRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository";
import { VerbGetterUseCase } from "@application/usescases/verbs/VerbsGetter";

export const getAllVerbs = async (req: Request, res: Response, next: NextFunction) => {

    const dynamoDBVerbRepo = new DynamoDBVerbsRepository();
    const verbGetterUseCase = new VerbGetterUseCase(dynamoDBVerbRepo);

    try {
        const verbs = await verbGetterUseCase.run();
        res.status(200).json(verbs);
        return;
    } catch (error) {
        return next(error);
    }

}