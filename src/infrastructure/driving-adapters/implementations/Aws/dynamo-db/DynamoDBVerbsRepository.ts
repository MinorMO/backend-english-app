import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";
import { DynamoDB } from "@infrastructure/driven-adpters/AWS/dynamo-db/DynamoDB";


export class DynamoDBVerbsRepository implements VerbRepository{

    private readonly _dynamoDB = DynamoDB.getInstance()

    async getAllVerbs(): Promise<Verb[]> {
        const response = await this._dynamoDB.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: 'ENTITY_TYPE = :entity_type',
            ExpressionAttributeValues: {
                ':entity_type': {
                    S: 'VERB'
                }
            }
        }).promise();

        const items = (response.Items !=null) ? response.Items : [];

        const verbs = items.map((item:any) => {
            const verbID: string = item['ENGLISH-APP_PK'].S ?? '';
            const form: string = item.form.S ?? '';
            const verbInEnglish: string = item.verbInEnglish.S ?? '';
            const translationSpanish: string = item.translationSpanish.S ?? '';
            return {
                verbID : verbID.split('_')[1],
                form,
                verbInEnglish,
                translationSpanish
            }
        })
        return verbs;


    }


    async insertVerb(verb: Verb): Promise<Verb> {
        await this._dynamoDB.putItem({
            TableName: DynamoDB.TABLE_NAME,
            Item: {
                'ENGLISH-APP_PK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENGLISH-APP_FK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENTITY_TYPE': {
                    S: 'VERB'
                },
                'form': {
                    S: verb.form
                },
                'verbInEnglish': {
                    S: verb.verbInEnglish
                },
                'translationSpanish': {
                    S: verb.translationSpanish
                }
            }
        }).promise();
        return verb;
    }


    async insertVerbs(verbs: Verb[]): Promise<Verb[]> {
        const writeRequests = verbs.map(verb => ({
        PutRequest: {
            Item: {
                'ENGLISH-APP_PK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENGLISH-APP_FK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENTITY_TYPE': {
                    S: 'VERB'
                },
                'form': {
                    S: verb.form
                },
                'verbInEnglish': {
                    S: verb.verbInEnglish
                },
                'translationSpanish': {
                    S: verb.translationSpanish
                }
            }
        }
    }));

    await this._dynamoDB.batchWriteItem({
        RequestItems: {
            [DynamoDB.TABLE_NAME]: writeRequests
        }
    }).promise();

    return verbs;

    }


    async updateVerb(verb: Verb): Promise<Verb> {
        await this._dynamoDB.updateItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'ENGLISH-APP_PK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENGLISH-APP_FK': {
                    S: `VERB_${verb.verbID}`
                }
            },
            UpdateExpression: 'SET #form = :form, #verbInEnglish = :verbInEnglish, #translationSpanish = :translationSpanish',
            ExpressionAttributeNames: {
                '#form': 'form',
                '#verbInEnglish': 'verbInEnglish',
                '#translationSpanish': 'translationSpanish'
            },
            ExpressionAttributeValues: {
                ':form': {
                    S: verb.form
                },
                ':verbInEnglish': {
                    S: verb.verbInEnglish
                },
                ':translationSpanish': {
                    S: verb.translationSpanish
                }
            }
        }).promise();
        return verb;

    }


    async deleteVerb(verb: Verb): Promise<void> {
        await this._dynamoDB.deleteItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'ENGLISH-APP_PK': {
                    S: `VERB_${verb.verbID}`
                },
                'ENGLISH-APP_FK': {
                    S: `VERB_${verb.verbID}`
                }
            }
        }).promise();
    }


    async getVerbById(verbId: string): Promise<Verb | null> {
        const params = {
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'ENGLISH-APP_PK': {
                    S: `VERB_${verbId}`
                },
                'ENGLISH-APP_FK': {
                    S: `VERB_${verbId}`
                }
            }
        }

            const response = await this._dynamoDB.getItem(params).promise();

            if(response.Item === undefined){
                return null;
            }

            const verb: Verb = {
                verbID: verbId,
                form: response.Item.form.S ?? '',
                verbInEnglish: response.Item.verbInEnglish.S ?? '',
                translationSpanish: response.Item.translationSpanish.S ?? ''
            }

            return verb;
            
        }
    
    async getVerb(verb: string): Promise<Verb | null> {
        
            const response = await this._dynamoDB.scan({
                TableName: DynamoDB.TABLE_NAME,
                FilterExpression: 'verbInEnglish = :verbInEnglish',
                ExpressionAttributeValues: {
                    ':verbInEnglish': {
                        S: verb
                    }
                }
            }).promise();

            const item = (response.Items !=null) ? response.Items[0] : undefined;

            if(item === undefined){
                return null;
            }

            const verbID: string = item['ENGLISH-APP_PK'].S ?? '';
            const form: string = item.form.S ?? '';
            const verbInEnglish: string = item.verbInEnglish.S ?? '';
            const translationSpanish: string = item.translationSpanish.S ?? '';

            const verbObj: Verb = {
                verbID : verbID.split('_')[1],
                form,
                verbInEnglish,
                translationSpanish
            }

            return verbObj;


    }

}