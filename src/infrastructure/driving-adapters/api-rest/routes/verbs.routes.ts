import {Router} from 'express'
import { authenticationMiddleware } from '@infrastructure/driving-adapters/api-rest/middlewares/authenticationMiddleware';
import { authorizationMiddleware } from '@infrastructure/driving-adapters/api-rest/middlewares/authorizationMiddleware';

import {
    deleteVerbController,
    updateVerbController,
    insertVerbController,
    getAllVerbsController,
    insertVerbsController
} from '../controllers/index'

const route = Router()
// Aplicar el middleware de autenticación a todas las rutas
route.use(authenticationMiddleware);

route.delete('/:id',authorizationMiddleware('admin'), deleteVerbController)
route.put('/:id',authorizationMiddleware('admin'), updateVerbController)
route.get('',authorizationMiddleware('admin'), getAllVerbsController)
route.post('/',authorizationMiddleware('admin'), insertVerbController)
route.post('/verbs',authorizationMiddleware('admin'), insertVerbsController)
export default route