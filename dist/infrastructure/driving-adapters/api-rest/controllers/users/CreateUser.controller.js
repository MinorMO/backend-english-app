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
exports.createUser = void 0;
const uuid_1 = require("uuid");
const UserCreator_1 = require("@application/usescases/users/UserCreator");
const DynamoDBUserRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository");
const BcryptAdapter_1 = require("@infrastructure/driven-adpters/auth/BcryptAdapter");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, lastName, password, role } = req.body;
    const dynamoDBUserRepo = new DynamoDBUserRepository_1.DynamoDBUserRepository();
    const bcryptAdapter = new BcryptAdapter_1.BcryptAdapter();
    const userCreatorUseCase = new UserCreator_1.UserCreatorUseCase(dynamoDBUserRepo, bcryptAdapter);
    const userToCreate = {
        id: (0, uuid_1.v4)(),
        email,
        name,
        lastName,
        password,
        role
    };
    try {
        const userCreated = yield userCreatorUseCase.run_createUser(userToCreate);
        res.status(200).json(userCreated);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=CreateUser.controller.js.map