"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const route = (0, express_1.Router)();
route.get('', index_1.pruebaController);
exports.default = route;
//# sourceMappingURL=prueba.routes.js.map