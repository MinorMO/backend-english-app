import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";

export class VerbGetterUseCase {
    private readonly verbRepository: VerbRepository;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
    }

    async run (): Promise<Verb[]> {
        const verbs:Verb[] = await this.verbRepository.getAllVerbs();
        return verbs;
    }
}