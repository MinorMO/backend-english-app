import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";
import { VerbNotFoundException } from "@domain/exceptions/verbs/VerbNotFoundException";

export class VerbGetterById {
    private readonly verbRepository: VerbRepository;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
    }


    async run (id:string ) : Promise<Verb> {
        const verb = await this.verbRepository.getVerbById(id);
        
        if (!verb) throw new VerbNotFoundException();

        return verb;
    }
}