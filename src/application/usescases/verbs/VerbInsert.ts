import {Verb} from "@domain/entities/Verb"
import {VerbRepository} from "@domain/repositories/VerbsRepository"
import {VerbAlreadyExistException} from "@domain/exceptions/verbs/VerbAlreadyExistException"
import {ExistVerb} from "@domain/services/verbs-domain-services/ExistVerb"


export class VerbInsertUseCase {
    private readonly _verbRepository: VerbRepository
    private readonly _existVerb: ExistVerb

    constructor(verbRepository: VerbRepository) {
        this._verbRepository = verbRepository
        this._existVerb = new ExistVerb(verbRepository)
    }

    async run(verb: Verb): Promise<Verb> {
        const existVerb: boolean = await this._existVerb.run(verb.verbInEnglish)
        if(existVerb) throw new VerbAlreadyExistException()

        const verbInserted: Verb = await this._verbRepository.insertVerb(verb)
        return verbInserted
    }


}