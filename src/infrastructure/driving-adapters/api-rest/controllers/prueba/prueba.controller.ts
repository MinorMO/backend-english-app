import { NextFunction, Request, Response } from "express"



export const prueba = async (req: Request, res: Response, next: NextFunction) => {

    

    try {
        
        res.status(200).json({ message: "Ruta de prueba exitosa!" })
        return
    } catch (error) {
        return next(error)
    }

    }