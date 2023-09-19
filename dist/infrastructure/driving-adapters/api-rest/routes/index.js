"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAlreadyExistException_1 = require("../../../../domain/exceptions/users/UserAlreadyExistException");
const UserNotFoundException_1 = require("../../../../domain/exceptions/users/UserNotFoundException");
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const loginRegister_routes_1 = __importDefault(require("./loginRegister.routes"));
const verbs_routes_1 = __importDefault(require("./verbs.routes"));
const route = (0, express_1.Router)();
//las rutas de usuario se encuentran en el archivo user.routes.ts
route.use('/users', user_routes_1.default);
route.use('', loginRegister_routes_1.default);
route.use('/verb', verbs_routes_1.default);
// dos middlewares o handlers de errores
//los casos de usos retornan excepciones a traves de throw y los controladores a traves del try catch
//van a manejarlos, en el catch se va a llamar a next con el error
//entonces cuando el controlador detecta un error lo pasa a este middleware
//este recibe el error y valida si es alguno de estos tipos de errores.
route.use((err, req, res, next) => {
    if (err instanceof UserAlreadyExistException_1.UserAlreadyExistException) {
        return res.status(400).json({ message: 'EL USUARIO YA EXISTE' });
    }
    else if (err instanceof UserNotFoundException_1.UserNotFoundException) {
        return res.status(400).json({ message: 'EL USUARIO NO EXISTE' });
    }
    else {
        next(err); // en caso de que no sea ninguno de los errores que se manejan, se pasa al siguiente middleware
    }
});
route.use((err, req, res, next) => {
    console.log(err);
    res.status(500); //error interno del servidor
    res.json({
        error: err
    });
});
exports.default = route;
//# sourceMappingURL=index.js.map