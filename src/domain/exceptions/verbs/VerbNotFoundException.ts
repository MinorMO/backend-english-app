export class VerbNotFoundException extends Error {
    constructor() {
        super("Verb not found");
    }
}