export class VerbAlreadyExistException extends Error {
    constructor(message: string = "Verb already exists") {
        super(message);
    }
}