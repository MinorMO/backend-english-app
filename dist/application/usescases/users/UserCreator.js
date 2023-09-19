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
exports.UserCreatorUseCase = void 0;
const ExistUserByUserEmail_1 = require("@domain/services/users-domain-services/ExistUserByUserEmail");
const UserAlreadyExistException_1 = require("@domain/exceptions/users/UserAlreadyExistException");
class UserCreatorUseCase {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.existUserByEmail = new ExistUserByUserEmail_1.ExistUserByEmail(userRepository);
        this.passwordHasher = passwordHasher;
    }
    run_createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.existUserByEmail.run_existUserByEmail(body.email);
            if (existUser) {
                throw new UserAlreadyExistException_1.UserAlreadyExistException();
            }
            // Hashear la contraseña antes de guardarla
            body.password = yield this.passwordHasher.hashPassword(body.password);
            const userCreated = yield this.userRepository.createUser(body);
            return userCreated;
        });
    }
}
exports.UserCreatorUseCase = UserCreatorUseCase;
//# sourceMappingURL=UserCreator.js.map