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
exports.insertVerb = void 0;
const uuid_1 = require("uuid");
const VerbInsert_1 = require("@application/usescases/verbs/VerbInsert");
const DynamoDBVerbsRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository");
const insertVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { form, verbInEnglish, translationSpanish } = req.body;
    const dynamoDBVerbRepo = new DynamoDBVerbsRepository_1.DynamoDBVerbsRepository();
    const verbInsertUseCase = new VerbInsert_1.VerbInsertUseCase(dynamoDBVerbRepo);
    const verbToInsert = {
        verbID: (0, uuid_1.v4)(),
        form,
        verbInEnglish,
        translationSpanish
    };
    try {
        const verbInserted = yield verbInsertUseCase.run(verbToInsert);
        res.status(200).json(verbInserted);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.insertVerb = insertVerb;
//# sourceMappingURL=InsertVerb.controller.js.map