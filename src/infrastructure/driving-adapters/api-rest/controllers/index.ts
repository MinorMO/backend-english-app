import {getAllUsers} from './users/GetAllUser.controller'
import {getUserById} from './users/GetUserById.controller'
import {createUser} from './users/CreateUser.controller'
import {updateUser} from './users/UpdateUser.controller'
import {deleteUser} from './users/DeleteUser.controller'
import {authenticateUser} from './users/AuthenticateUser.controller'
import {deleteVerb} from './verbs/DeleteVerb.controller'
import {updateVerb} from './verbs/UpdateVerb.controller'
import {insertVerb} from './verbs/InsertVerb.controller'
import {getAllVerbs} from './verbs/GetAllVerbs.controller'
import {insertVerbs} from './verbs/InsertVerbs.controller'
import { prueba } from './prueba/prueba.controller'





export {
    getAllUsers as getAllUsersController,
    getUserById as getUserByIdController,
    createUser as createUserController,
    updateUser as updateUserController,
    deleteUser as deleteUserController,
    authenticateUser as authenticateUserController,
    deleteVerb as deleteVerbController,
    updateVerb as updateVerbController,
    insertVerb as insertVerbController,
    getAllVerbs as getAllVerbsController,
    insertVerbs as insertVerbsController,
    prueba as pruebaController

}