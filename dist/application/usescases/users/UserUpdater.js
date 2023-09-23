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
exports.UserUpdaterUseCase = void 0;
const UserGetterById_1 = require("@domain/services/users-domain-services/UserGetterById");
class UserUpdaterUseCase {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.userGetterById = new UserGetterById_1.UserGetterById(userRepository);
        this.passwordHasher = passwordHasher;
    }
    run_updateUser(data) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userGetterById.run(data.id);
            const dataToUpdate = {
                email: (_a = data.email) !== null && _a !== void 0 ? _a : user.email,
                name: (_b = data.name) !== null && _b !== void 0 ? _b : user.name,
                lastName: (_c = data.lastName) !== null && _c !== void 0 ? _c : user.lastName,
                password: data.password ? yield this.passwordHasher.hashPassword(data.password) : user.password,
                role: (_d = data.role) !== null && _d !== void 0 ? _d : user.role,
                id: data.id
            };
            const userUpdated = yield this.userRepository.updateUser(dataToUpdate);
            return userUpdated;
        });
    }
}
exports.UserUpdaterUseCase = UserUpdaterUseCase;
//# sourceMappingURL=UserUpdater.js.map