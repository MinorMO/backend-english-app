"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const JwtAdapter_1 = require("@infrastructure/driven-adpters/auth/JwtAdapter"); // Asume que tienes una implementación de JwtAdapter
/*export const authenticationMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  const jwtAdapter = new JwtAdapter(); // Crear una instancia de JwtAdapter o usar la implementación adecuada
  try {
    const decoded: User = jwtAdapter.verifyToken(token); // Decodificar el token y obtener los datos del usuario
    req.user = decoded; // Adjuntar la información del usuario al objeto req
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};
*/
const authenticationMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    console.log("autentificacion");
    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }
    const jwtAdapter = new JwtAdapter_1.JwtAdapter();
    try {
        const decoded = jwtAdapter.verifyToken(token);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authenticationMiddleware.js.map