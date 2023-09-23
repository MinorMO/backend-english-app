import { Request,Response, NextFunction } from 'express';
import {User} from '@domain/entities/User'
import {RequestWithUser} from'../../../../../typings/custom';

/*export const authorizationMiddleware = (requiredRole:string) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user:User = req.user as User
        if (user.role !== requiredRole) {
            return res.status(403).send({ message: 'Access denied' });
        }
        next();
    }
}*/

export const authorizationMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: User = res.locals.user;
        console.log(user)
        console.log("autorizacion")
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).send({ message: 'Access denied' });
        }
        next();
    }
}
