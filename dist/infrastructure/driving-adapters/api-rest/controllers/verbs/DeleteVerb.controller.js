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
exports.deleteVerb = void 0;
const DynamoDBVerbsRepository_1 = require("@infrastructure/driving-adapters/implementations/Aws/dynamo-db/DynamoDBVerbsRepository");
const VerbDeleter_1 = require("@application/usescases/verbs/VerbDeleter");
const deleteVerb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verbId = req.params.id;
    const dynamoDBVerbRepo = new DynamoDBVerbsRepository_1.DynamoDBVerbsRepository();
    const verbDeleterUseCase = new VerbDeleter_1.VerbDeleterUseCase(dynamoDBVerbRepo);
    try {
        const verbDeleted = yield verbDeleterUseCase.run(verbId);
        res.status(200).json(verbDeleted);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteVerb = deleteVerb;
//# sourceMappingURL=DeleteVerb.controller.js.map