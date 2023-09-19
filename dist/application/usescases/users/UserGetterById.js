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
exports.UserGetterByIdUseCase = void 0;
const UserGetterById_1 = require("@domain/services/users-domain-services/UserGetterById");
class UserGetterByIdUseCase {
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._userGetterById = new UserGetterById_1.UserGetterById(userRepository);
    }
    run_UserGetterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userGetterById.run(id);
            return user;
        });
    }
}
exports.UserGetterByIdUseCase = UserGetterByIdUseCase;
//# sourceMappingURL=UserGetterById.js.map