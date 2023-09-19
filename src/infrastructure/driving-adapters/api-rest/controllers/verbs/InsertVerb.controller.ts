import {v4 as uuidv4} from 'uuid';
import {Request, Response, NextFunction} from 'express';
import { Verb } from '@domain/entities/Verb';
import { VerbInsertUseCase } from '@application/usescases/verbs/VerbInsert';
import { DynamoDBVerbsRepository } from '@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository';

export const insertVerb = async (req: Request, res: Response, next: NextFunction) => {

    const {
        form,
        verbInEnglish,
        translationSpanish
    } = req.body;

    const dynamoDBVerbRepo = new DynamoDBVerbsRepository();
    const verbInsertUseCase = new VerbInsertUseCase(dynamoDBVerbRepo);

    const verbToInsert: Verb = {
        verbID: uuidv4(),
        form,
        verbInEnglish,
        translationSpanish
    }

    try {
        const verbInserted = await verbInsertUseCase.run(verbToInsert);
        res.status(200).json(verbInserted)
        return 
    } catch (error) {
        return next(error);
    }

}