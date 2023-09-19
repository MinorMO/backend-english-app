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
exports.VerbDeleterUseCase = void 0;
const VerbGetterById_1 = require("@domain/services/verbs-domain-services/VerbGetterById");
class VerbDeleterUseCase {
    constructor(verbRepository) {
        this.verbRepository = verbRepository;
        this.verbGetterById = new VerbGetterById_1.VerbGetterById(verbRepository);
    }
    run(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const verbToDelete = yield this.verbGetterById.run(id);
            yield this.verbRepository.deleteVerb(verbToDelete);
            return verbToDelete;
        });
    }
}
exports.VerbDeleterUseCase = VerbDeleterUseCase;
//# sourceMappingURL=VerbDeleter.js.map