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
exports.insertVerbs = void 0;
const uuid_1 = require("uuid");
const VerbsInsert_1 = require("@application/usescases/verbs/VerbsInsert");
const DynamoDBVerbsRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository");
const insertVerbs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verbsData = req.body.verbs; //llamar al json verbs
    /*
{
  "verbs": [
    {
      "form": "run",
      "verbInEnglish": "run",
      "translationSpanish": "correr"
    },
    {
      "form": "eat",
      "verbInEnglish": "eat",
      "translationSpanish": "comer"
    }
  ]
}
*/
    const dynamoDBVerbRepo = new DynamoDBVerbsRepository_1.DynamoDBVerbsRepository();
    const verbsInsertUseCase = new VerbsInsert_1.VerbsInsertUseCase(dynamoDBVerbRepo);
    // Asigna un verbID único a cada verbo y crea un array de verbos
    const verbsToInsert = verbsData.map((verbData) => ({
        verbID: (0, uuid_1.v4)(),
        form: verbData.form,
        verbInEnglish: verbData.verbInEnglish,
        translationSpanish: verbData.translationSpanish
    }));
    try {
        const verbsInserted = yield verbsInsertUseCase.run(verbsToInsert);
        res.status(200).json(verbsInserted);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.insertVerbs = insertVerbs;
//# sourceMappingURL=InsertVerbs.controller.js.map