"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationMiddleware_1 = require("@infrastructure/driving-adapters/api-rest/middlewares/authenticationMiddleware");
const authorizationMiddleware_1 = require("@infrastructure/driving-adapters/api-rest/middlewares/authorizationMiddleware");
const index_1 = require("../controllers/index");
const route = (0, express_1.Router)();
// Aplicar el middleware de autenticación a todas las rutas
route.use(authenticationMiddleware_1.authenticationMiddleware);
route.delete('/:id', (0, authorizationMiddleware_1.authorizationMiddleware)('admin'), index_1.deleteVerbController);
route.put('/:id', (0, authorizationMiddleware_1.authorizationMiddleware)('admin'), index_1.updateVerbController);
route.get('', (0, authorizationMiddleware_1.authorizationMiddleware)('admin'), index_1.getAllVerbsController);
route.post('/', (0, authorizationMiddleware_1.authorizationMiddleware)('admin'), index_1.insertVerbController);
route.post('/verbs', (0, authorizationMiddleware_1.authorizationMiddleware)('admin'), index_1.insertVerbsController);
exports.default = route;
//# sourceMappingURL=verbs.routes.js.map