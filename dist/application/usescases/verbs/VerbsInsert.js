"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerbsInsertUseCase = void 0;
const VerbAlreadyExistException_1 = require("@domain/exceptions/verbs/VerbAlreadyExistException");
const ExistVerb_1 = require("@domain/services/verbs-domain-services/ExistVerb");
class VerbsInsertUseCase {
    constructor(verbRepository) {
        this.verbRepository = verbRepository;
        this.existVerb = new ExistVerb_1.ExistVerb(verbRepository);
    }
    run(verbs) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let verb of verbs) {
                const existVerb = yield this.existVerb.run(verb.verbInEnglish);
                if (existVerb)
                    throw new VerbAlreadyExistException_1.VerbAlreadyExistException(`The verb ${verb.verbInEnglish} already exists.`);
            }
            const verbsInserted = yield this.verbRepository.insertVerbs(verbs);
            return verbsInserted;
        });
    }
}
exports.VerbsInsertUseCase = VerbsInsertUseCase;
//# sourceMappingURL=VerbsInsert.js.map