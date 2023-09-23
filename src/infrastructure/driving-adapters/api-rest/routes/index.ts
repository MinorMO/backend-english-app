import { UserAlreadyExistException } from "../../../../domain/exceptions/users/UserAlreadyExistException"
import { UserNotFoundException } from "../../../../domain/exceptions/users/UserNotFoundException"
import {Request, Response, Router, NextFunction} from 'express'
import userRoutes from './user.routes'
import loginRegisterRoutes from './loginRegister.routes'
import verbsRoutes from './verbs.routes'
import pruebaRoutes from './prueba.routes'


const route = Router()
//las rutas de usuario se encuentran en el archivo user.routes.ts
route.use('/users', userRoutes)
route.use('', loginRegisterRoutes)
route.use('/verb', verbsRoutes)
route.use('/prueba', pruebaRoutes)


// dos middlewares o handlers de errores
    //los casos de usos retornan excepciones a traves de throw y los controladores a traves del try catch
    //van a manejarlos, en el catch se va a llamar a next con el error
    //entonces cuando el controlador detecta un error lo pasa a este middleware
    //este recibe el error y valida si es alguno de estos tipos de errores.
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof UserAlreadyExistException){
        return res.status(400).json({message: 'EL USUARIO YA EXISTE'})
    }
    else if(err instanceof UserNotFoundException){
        return res.status(400).json({message: 'EL USUARIO NO EXISTE'})
    }else{
        next(err) // en caso de que no sea ninguno de los errores que se manejan, se pasa al siguiente middleware
    }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500) //error interno del servidor
    res.json({
        error:err
    })
})

export default route
   
