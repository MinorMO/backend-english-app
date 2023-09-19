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
exports.updateUser = void 0;
const DynamoDBUserRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBUserRepository");
const UserUpdater_1 = require("@application/usescases/users/UserUpdater");
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, password, role } = req.body;
    const UserId = req.params.id;
    const dynamodbUserRepo = new DynamoDBUserRepository_1.DynamoDBUserRepository();
    const userUpdaterUseCase = new UserUpdater_1.UserUpdaterUseCase(dynamodbUserRepo);
    try {
        const userToUpdate = {
            id: UserId,
            name,
            lastName,
            email,
            password,
            role
        };
        const user = yield userUpdaterUseCase.run_updateUser(userToUpdate);
        res.status(200).json(user);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=UpdateUser.controller.js.map