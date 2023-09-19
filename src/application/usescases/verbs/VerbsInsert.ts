import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";
import { VerbAlreadyExistException } from "@domain/exceptions/verbs/VerbAlreadyExistException";
import { ExistVerb } from "@domain/services/verbs-domain-services/ExistVerb";

export class VerbsInsertUseCase {

    private readonly verbRepository: VerbRepository;
    private readonly existVerb: ExistVerb;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
        this.existVerb = new ExistVerb(verbRepository);
    }

    async run (verbs:Verb[] ) : Promise<Verb[]> {
        
        for (let verb of verbs){
            const existVerb: boolean = await this.existVerb.run(verb.verbInEnglish);
            if (existVerb) throw new VerbAlreadyExistException(`The verb ${verb.verbInEnglish} already exists.`);
        }

        const verbsInserted: Verb[] = await this.verbRepository.insertVerbs(verbs);
        return verbsInserted;
    }
}