"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBVerbsRepository = void 0;
const DynamoDB_1 = require("@infrastructure/driven-adpters/AWS/dynamo-db/DynamoDB");
class DynamoDBVerbsRepository {
    constructor() {
        this._dynamoDB = DynamoDB_1.DynamoDB.getInstance();
    }
    getAllVerbs() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._dynamoDB.scan({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                FilterExpression: 'ENTITY_TYPE = :entity_type',
                ExpressionAttributeValues: {
                    ':entity_type': {
                        S: 'VERB'
                    }
                }
            }).promise();
            const items = (response.Items != null) ? response.Items : [];
            const verbs = items.map((item) => {
                var _a, _b, _c, _d;
                const verbID = (_a = item['ENGLISH-APP_PK'].S) !== null && _a !== void 0 ? _a : '';
                const form = (_b = item.form.S) !== null && _b !== void 0 ? _b : '';
                const verbInEnglish = (_c = item.verbInEnglish.S) !== null && _c !== void 0 ? _c : '';
                const translationSpanish = (_d = item.translationSpanish.S) !== null && _d !== void 0 ? _d : '';
                return {
                    verbID: verbID.split('_')[1],
                    form,
                    verbInEnglish,
                    translationSpanish
                };
            });
            return verbs;
        });
    }
    insertVerb(verb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.putItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
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
        });
    }
    insertVerbs(verbs) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this._dynamoDB.batchWriteItem({
                RequestItems: {
                    [DynamoDB_1.DynamoDB.TABLE_NAME]: writeRequests
                }
            }).promise();
            return verbs;
        });
    }
    updateVerb(verb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.updateItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
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
        });
    }
    deleteVerb(verb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.deleteItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                Key: {
                    'ENGLISH-APP_PK': {
                        S: `VERB_${verb.verbID}`
                    },
                    'ENGLISH-APP_FK': {
                        S: `VERB_${verb.verbID}`
                    }
                }
            }).promise();
        });
    }
    getVerbById(verbId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                Key: {
                    'ENGLISH-APP_PK': {
                        S: `VERB_${verbId}`
                    },
                    'ENGLISH-APP_FK': {
                        S: `VERB_${verbId}`
                    }
                }
            };
            const response = yield this._dynamoDB.getItem(params).promise();
            if (response.Item === undefined) {
                return null;
            }
            const verb = {
                verbID: verbId,
                form: (_a = response.Item.form.S) !== null && _a !== void 0 ? _a : '',
                verbInEnglish: (_b = response.Item.verbInEnglish.S) !== null && _b !== void 0 ? _b : '',
                translationSpanish: (_c = response.Item.translationSpanish.S) !== null && _c !== void 0 ? _c : ''
            };
            return verb;
        });
    }
    getVerb(verb) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._dynamoDB.scan({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                FilterExpression: 'verbInEnglish = :verbInEnglish',
                ExpressionAttributeValues: {
                    ':verbInEnglish': {
                        S: verb
                    }
                }
            }).promise();
            const item = (response.Items != null) ? response.Items[0] : undefined;
            if (item === undefined) {
                return null;
            }
            const verbID = (_a = item['ENGLISH-APP_PK'].S) !== null && _a !== void 0 ? _a : '';
            const form = (_b = item.form.S) !== null && _b !== void 0 ? _b : '';
            const verbInEnglish = (_c = item.verbInEnglish.S) !== null && _c !== void 0 ? _c : '';
            const translationSpanish = (_d = item.translationSpanish.S) !== null && _d !== void 0 ? _d : '';
            const verbObj = {
                verbID: verbID.split('_')[1],
                form,
                verbInEnglish,
                translationSpanish
            };
            return verbObj;
        });
    }
}
exports.DynamoDBVerbsRepository = DynamoDBVerbsRepository;
//# sourceMappingURL=DynamoDBVerbsRepository.js.map