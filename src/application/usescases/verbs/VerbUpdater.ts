import { Verb } from "@domain/entities/Verb";
import { VerbRepository } from "@domain/repositories/VerbsRepository";
import { VerbGetterById } from "@domain/services/verbs-domain-services/VerbGetterById";

export class VerbUpdaterUseCase {
    private readonly verbRepository: VerbRepository;
    private readonly verbGetterById: VerbGetterById;

    constructor(verbRepository: VerbRepository) {
        this.verbRepository = verbRepository;
        this.verbGetterById = new VerbGetterById(verbRepository);

    }

    async run (data:Verb ) : Promise<Verb> {
        const verb = await this.verbGetterById.run(data.verbID);

        const dataToUpdate = {
            verbID: data.verbID ?? verb.verbID,
            verbInEnglish: data.verbInEnglish ?? verb.verbInEnglish,
            translationSpanish: data.translationSpanish ?? verb.translationSpanish,
            form: data.form ?? verb.form
        }

        const verbUpdated = await this.verbRepository.updateVerb(dataToUpdate);
        return verbUpdated;
    }

}