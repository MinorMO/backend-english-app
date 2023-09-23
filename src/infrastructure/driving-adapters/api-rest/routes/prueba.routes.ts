import {Router} from 'express'

import {
    pruebaController
} from '../controllers/index'

const route = Router()

route.get('', pruebaController)

export default route