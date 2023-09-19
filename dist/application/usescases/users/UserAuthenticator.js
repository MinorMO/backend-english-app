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
exports.UserAuthenticatorUseCase = void 0;
const UserNotFoundException_1 = require("@domain/exceptions/users/UserNotFoundException");
const UserInvalidPassword_1 = require("@domain/exceptions/users/UserInvalidPassword");
class UserAuthenticatorUseCase {
    constructor(userRepository, passwordHasher, tokenGenerator) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByEmail(email);
            if (!user)
                throw new UserNotFoundException_1.UserNotFoundException();
            const passwordMatch = yield this.passwordHasher.comparePassword(password, user.password);
            if (!passwordMatch)
                throw new UserInvalidPassword_1.UserInvalidPassowrd();
            return this.tokenGenerator.generateToken({ id: user.id, role: user.role });
        });
    }
}
exports.UserAuthenticatorUseCase = UserAuthenticatorUseCase;
//# sourceMappingURL=UserAuthenticator.js.map