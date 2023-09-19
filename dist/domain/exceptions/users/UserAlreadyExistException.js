"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistException = void 0;
// es mejor encapsular las excepciones 
class UserAlreadyExistException extends Error {
    constructor() {
        super("User already exist/El usuario ya existe");
    }
}
exports.UserAlreadyExistException = UserAlreadyExistException;
//# sourceMappingURL=UserAlreadyExistException.js.map