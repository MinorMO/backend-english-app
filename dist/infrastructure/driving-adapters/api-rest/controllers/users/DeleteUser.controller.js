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
exports.deleteUser = void 0;
const DynamoDBUserRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository");
const UserDeteleter_1 = require("@application/usescases/users/UserDeteleter");
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.params.id;
    const dynamodbUserRepo = new DynamoDBUserRepository_1.DynamoDBUserRepository();
    const userDeteleterUseCase = new UserDeteleter_1.UserDeteleterUseCase(dynamodbUserRepo);
    try {
        const userDeleted = yield userDeteleterUseCase.run_UserDeteleter(UserId);
        res.status(200).json(userDeleted);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=DeleteUser.controller.js.map