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
exports.ExistVerb = void 0;
class ExistVerb {
    constructor(verbRepository) {
        this.verbRepository = verbRepository;
    }
    run(verbInEnglish) {
        return __awaiter(this, void 0, void 0, function* () {
            const existVerb = yield this.verbRepository.getVerb(verbInEnglish);
            if (existVerb)
                return true;
            return false;
        });
    }
}
exports.ExistVerb = ExistVerb;
//# sourceMappingURL=ExistVerb.js.map