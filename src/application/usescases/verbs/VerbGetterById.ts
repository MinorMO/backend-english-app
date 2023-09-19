import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";
import { VerbGetterById } from "@domain/services/verbs-domain-services/VerbGetterById";

export class VerbGetterByIdUseCase{
    private readonly verbRepository: VerbRepository;
    private readonly verbGetterById: VerbGetterById;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
        this.verbGetterById = new VerbGetterById(verbRepository);

    }

    async run (id:string ) : Promise<Verb> {
        const verb = await this.verbGetterById.run(id);
        return verb;
    }

}