import {Router} from 'express'

import {
    authenticateUserController,
    createUserController
} from '../controllers/index'

const route = Router()

route.post('/login', authenticateUserController)
route.post('/register', createUserController)


export default route