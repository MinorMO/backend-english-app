import { Request,Response, NextFunction } from 'express';
import { JwtAdapter } from '@infrastructure/driven-adpters/auth/JwtAdapter'; // Asume que tienes una implementación de JwtAdapter
import { User } from '../../../../domain/entities/User';
import {RequestWithUser} from'../../../../../typings/custom';

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

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  const jwtAdapter = new JwtAdapter();
  try {
    const decoded: User = jwtAdapter.verifyToken(token);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};
