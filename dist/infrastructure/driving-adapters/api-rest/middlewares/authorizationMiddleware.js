"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
/*export const authorizationMiddleware = (requiredRole:string) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user:User = req.user as User
        if (user.role !== requiredRole) {
            return res.status(403).send({ message: 'Access denied' });
        }
        next();
    }
}*/
const authorizationMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const user = res.locals.user;
        console.log(user);
        console.log("autorizacion");
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).send({ message: 'Access denied' });
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorizationMiddleware.js.map