"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const route = (0, express_1.Router)();
route.post('/login', index_1.authenticateUserController);
route.post('/register', index_1.createUserController);
exports.default = route;
//# sourceMappingURL=loginRegister.routes.js.map