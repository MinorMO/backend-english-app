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
exports.authenticateUser = void 0;
const UserAuthenticator_1 = require("@application/usescases/users/UserAuthenticator");
const DynamoDBUserRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository");
const BcryptAdapter_1 = require("@infrastructure/driven-adpters/auth/BcryptAdapter");
const JwtAdapter_1 = require("@infrastructure/driven-adpters/auth/JwtAdapter");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const dynamoDBUserRepo = new DynamoDBUserRepository_1.DynamoDBUserRepository();
    const bcryptAdapter = new BcryptAdapter_1.BcryptAdapter();
    const jwtAdapter = new JwtAdapter_1.JwtAdapter();
    const userAuthenticatorUseCase = new UserAuthenticator_1.UserAuthenticatorUseCase(dynamoDBUserRepo, bcryptAdapter, jwtAdapter);
    try {
        const token = yield userAuthenticatorUseCase.authenticate(email, password);
        res.status(200).json({ token });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=AuthenticateUser.controller.js.map