"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruebaController = exports.insertVerbsController = exports.getAllVerbsController = exports.insertVerbController = exports.updateVerbController = exports.deleteVerbController = exports.authenticateUserController = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const GetAllUser_controller_1 = require("./users/GetAllUser.controller");
Object.defineProperty(exports, "getAllUsersController", { enumerable: true, get: function () { return GetAllUser_controller_1.getAllUsers; } });
const GetUserById_controller_1 = require("./users/GetUserById.controller");
Object.defineProperty(exports, "getUserByIdController", { enumerable: true, get: function () { return GetUserById_controller_1.getUserById; } });
const CreateUser_controller_1 = require("./users/CreateUser.controller");
Object.defineProperty(exports, "createUserController", { enumerable: true, get: function () { return CreateUser_controller_1.createUser; } });
const UpdateUser_controller_1 = require("./users/UpdateUser.controller");
Object.defineProperty(exports, "updateUserController", { enumerable: true, get: function () { return UpdateUser_controller_1.updateUser; } });
const DeleteUser_controller_1 = require("./users/DeleteUser.controller");
Object.defineProperty(exports, "deleteUserController", { enumerable: true, get: function () { return DeleteUser_controller_1.deleteUser; } });
const AuthenticateUser_controller_1 = require("./users/AuthenticateUser.controller");
Object.defineProperty(exports, "authenticateUserController", { enumerable: true, get: function () { return AuthenticateUser_controller_1.authenticateUser; } });
const DeleteVerb_controller_1 = require("./verbs/DeleteVerb.controller");
Object.defineProperty(exports, "deleteVerbController", { enumerable: true, get: function () { return DeleteVerb_controller_1.deleteVerb; } });
const UpdateVerb_controller_1 = require("./verbs/UpdateVerb.controller");
Object.defineProperty(exports, "updateVerbController", { enumerable: true, get: function () { return UpdateVerb_controller_1.updateVerb; } });
const InsertVerb_controller_1 = require("./verbs/InsertVerb.controller");
Object.defineProperty(exports, "insertVerbController", { enumerable: true, get: function () { return InsertVerb_controller_1.insertVerb; } });
const GetAllVerbs_controller_1 = require("./verbs/GetAllVerbs.controller");
Object.defineProperty(exports, "getAllVerbsController", { enumerable: true, get: function () { return GetAllVerbs_controller_1.getAllVerbs; } });
const InsertVerbs_controller_1 = require("./verbs/InsertVerbs.controller");
Object.defineProperty(exports, "insertVerbsController", { enumerable: true, get: function () { return InsertVerbs_controller_1.insertVerbs; } });
const prueba_controller_1 = require("./prueba/prueba.controller");
Object.defineProperty(exports, "pruebaController", { enumerable: true, get: function () { return prueba_controller_1.prueba; } });
//# sourceMappingURL=index.js.map