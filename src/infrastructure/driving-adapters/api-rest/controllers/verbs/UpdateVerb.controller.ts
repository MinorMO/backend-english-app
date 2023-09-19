import { NextFunction, Request, Response } from "express";
import { DynamoDBVerbsRepository } from "@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository";
import { VerbUpdaterUseCase } from "@application/usescases/verbs/VerbUpdater";
import { Verb } from "@domain/entities/Verb";


export const updateVerb = async (req: Request, res: Response, next: NextFunction) => {

    const {
        form,
        verbInEnglish,
        translationSpanish
    } = req.body;

    const verbId = req.params.id;

    const dynamoDBVerbRepo = new DynamoDBVerbsRepository();
    const verbUpdaterUseCase = new VerbUpdaterUseCase(dynamoDBVerbRepo);

    try {
        
        const verbToUpdate : Verb = {
            verbID: verbId,
            form,
            verbInEnglish,
            translationSpanish
        }

        const verb = await verbUpdaterUseCase.run(verbToUpdate);

        res.status(200).json(verb);
        return;
    } catch (error) {
        return next(error);
    }


}