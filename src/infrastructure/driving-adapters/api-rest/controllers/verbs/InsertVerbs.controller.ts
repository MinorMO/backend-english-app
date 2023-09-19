import {v4 as uuidv4} from 'uuid';
import {Request, Response, NextFunction} from 'express';
import { Verb } from '@domain/entities/Verb';
import { VerbsInsertUseCase } from '@application/usescases/verbs/VerbsInsert';
import { DynamoDBVerbsRepository } from '@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository';

export const insertVerbs = async (req: Request, res: Response, next: NextFunction) => {

    const verbsData = req.body.verbs;  //llamar al json verbs

    /*
{
  "verbs": [
    {
      "form": "run",
      "verbInEnglish": "run",
      "translationSpanish": "correr"
    },
    {
      "form": "eat",
      "verbInEnglish": "eat",
      "translationSpanish": "comer"
    }
  ]
}    
*/


    const dynamoDBVerbRepo = new DynamoDBVerbsRepository();
    const verbsInsertUseCase = new VerbsInsertUseCase(dynamoDBVerbRepo);

    // Asigna un verbID único a cada verbo y crea un array de verbos
    const verbsToInsert: Verb[] = verbsData.map((verbData: any) => ({
        verbID: uuidv4(),
        form: verbData.form,
        verbInEnglish: verbData.verbInEnglish,
        translationSpanish: verbData.translationSpanish
    }));

    try {
        const verbsInserted = await verbsInsertUseCase.run(verbsToInsert);
        res.status(200).json(verbsInserted);
        return;
    } catch (error) {
        return next(error);
    }

}