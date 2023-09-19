import { VerbRepository } from "@domain/repositories/VerbsRepository";

export class ExistVerb{

    private readonly verbRepository: VerbRepository;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
    }

    async run (verbInEnglish:string ) : Promise<boolean> {
        const existVerb = await this.verbRepository.getVerb(verbInEnglish);
        if (existVerb) return true;
        return false;
    }

}