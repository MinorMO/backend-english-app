import {Router} from 'express'
import { authenticationMiddleware } from '@infrastructure/driving-adapters/api-rest/middlewares/authenticationMiddleware';
import { authorizationMiddleware } from '@infrastructure/driving-adapters/api-rest/middlewares/authorizationMiddleware';

import {
    getAllUsersController,
    updateUserController,
    deleteUserController,
    getUserByIdController,
} from '../controllers/index'

const route = Router()
// Aplicar el middleware de autenticación a todas las rutas
route.use(authenticationMiddleware);

route.delete('/:id',authorizationMiddleware('admin'), deleteUserController)
route.put('/:id',authorizationMiddleware('admin'), updateUserController)
route.get('',authorizationMiddleware('admin'), getAllUsersController)
route.get('/:id',authorizationMiddleware('admin'), getUserByIdController)


export default route