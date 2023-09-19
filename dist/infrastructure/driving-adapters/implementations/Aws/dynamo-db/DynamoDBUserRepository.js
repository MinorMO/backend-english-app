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
exports.DynamoDBUserRepository = void 0;
const DynamoDB_1 = require("@infrastructure/driven-adpters/AWS/dynamo-db/DynamoDB");
class DynamoDBUserRepository {
    constructor() {
        this._dynamoDB = DynamoDB_1.DynamoDB.getInstance();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._dynamoDB.scan({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                FilterExpression: 'ENTITY_TYPE = :entity_type',
                ExpressionAttributeValues: {
                    ':entity_type': {
                        S: 'USER'
                    }
                }
            }).promise();
            const items = (response.Items != null) ? response.Items : [];
            const user = items.map((item) => {
                var _a, _b, _c, _d, _e, _f;
                const id = (_a = item['ENGLISH-APP_PK'].S) !== null && _a !== void 0 ? _a : '';
                const name = (_b = item.name.S) !== null && _b !== void 0 ? _b : '';
                const lastName = (_c = item.lastName.S) !== null && _c !== void 0 ? _c : '';
                const email = (_d = item.email.S) !== null && _d !== void 0 ? _d : '';
                const password = (_e = item.password.S) !== null && _e !== void 0 ? _e : '';
                const role = (_f = item.role.S) !== null && _f !== void 0 ? _f : '';
                return {
                    id: id.split('_')[1],
                    name,
                    lastName,
                    email,
                    password,
                    role
                };
            });
            return user;
        });
    }
    getUserById(Userid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._dynamoDB.scan({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                FilterExpression: '#pk = :pk',
                ExpressionAttributeNames: {
                    '#pk': 'ENGLISH-APP_PK'
                },
                ExpressionAttributeValues: {
                    ':pk': {
                        S: `USER_${Userid}`
                    }
                }
            }).promise();
            const item = (response.Items != null) ? response.Items[0] : undefined;
            if (item === undefined)
                return null;
            const id = (_a = item['ENGLISH-APP_PK'].S) !== null && _a !== void 0 ? _a : '';
            const name = (_b = item.name.S) !== null && _b !== void 0 ? _b : '';
            const lastName = (_c = item.lastName.S) !== null && _c !== void 0 ? _c : '';
            const email = (_d = item.email.S) !== null && _d !== void 0 ? _d : '';
            const password = (_e = item.password.S) !== null && _e !== void 0 ? _e : '';
            const role = (_f = item.role.S) !== null && _f !== void 0 ? _f : '';
            const user = {
                id: id.split('_')[1],
                name,
                lastName,
                email,
                password,
                role
            };
            return user;
        });
    }
    getUserByEmail(userEmail) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._dynamoDB.scan({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                FilterExpression: 'email = :userEmail',
                /*ExpressionAttributeNames: {  // <-- Nombres de atributos
                    '#email': 'userEmail'
                }, como userEmail es diferente del atributo de la tabla email no es necesario y se quita arriba el "#"            */
                ExpressionAttributeValues: {
                    ':userEmail': {
                        S: userEmail
                    }
                }
            }).promise();
            const item = (response.Items != null) ? response.Items[0] : undefined;
            if (item === undefined)
                return null;
            const id = (_a = item['ENGLISH-APP_PK'].S) !== null && _a !== void 0 ? _a : '';
            const name = (_b = item.name.S) !== null && _b !== void 0 ? _b : '';
            const lastName = (_c = item.lastName.S) !== null && _c !== void 0 ? _c : '';
            const email = (_d = item.email.S) !== null && _d !== void 0 ? _d : '';
            const password = (_e = item.password.S) !== null && _e !== void 0 ? _e : '';
            const role = (_f = item.role.S) !== null && _f !== void 0 ? _f : '';
            const user = {
                id: id.split('_')[1],
                name,
                lastName,
                email,
                password,
                role
            };
            return user;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.putItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                Item: {
                    'ENGLISH-APP_PK': {
                        S: `USER_${user.id}`
                    },
                    'ENGLISH-APP_FK': {
                        S: `USER_${user.id}`
                    },
                    'ENTITY_TYPE': {
                        S: 'USER'
                    },
                    'name': {
                        S: user.name
                    },
                    'lastName': {
                        S: user.lastName
                    },
                    'email': {
                        S: user.email
                    },
                    'password': {
                        S: user.password
                    },
                    'role': {
                        S: user.role
                    }
                }
            }).promise();
            return user;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.updateItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                Key: {
                    'ENGLISH-APP_PK': {
                        S: `USER_${user.id}`
                    },
                    'ENGLISH-APP_FK': {
                        S: `USER_${user.id}`
                    }
                },
                UpdateExpression: 'SET #name = :name, #lastName = :lastName, #email = :email, #password = :password, #role = :role',
                ExpressionAttributeNames: {
                    '#name': 'name',
                    '#lastName': 'lastName',
                    '#email': 'email',
                    '#password': 'password',
                    '#role': 'role'
                },
                ExpressionAttributeValues: {
                    ':name': {
                        S: user.name
                    },
                    ':lastName': {
                        S: user.lastName
                    },
                    ':email': {
                        S: user.email
                    },
                    ':password': {
                        S: user.password
                    },
                    ':role': {
                        S: user.role
                    }
                }
            }).promise();
            return user;
        });
    }
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dynamoDB.deleteItem({
                TableName: DynamoDB_1.DynamoDB.TABLE_NAME,
                Key: {
                    'ENGLISH-APP_PK': {
                        S: `USER_${user.id}`
                    },
                    'ENGLISH-APP_FK': {
                        S: `USER_${user.id}`
                    }
                }
            }).promise();
        });
    }
}
exports.DynamoDBUserRepository = DynamoDBUserRepository;
//# sourceMappingURL=DynamoDBUserRepository.js.map