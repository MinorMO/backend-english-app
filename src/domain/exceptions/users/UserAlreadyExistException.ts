// es mejor encapsular las excepciones 
export class UserAlreadyExistException extends Error {
    constructor() {
        super("User already exist/El usuario ya existe")
    }
}