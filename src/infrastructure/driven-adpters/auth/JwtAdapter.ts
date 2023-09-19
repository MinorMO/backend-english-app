import * as jwt from 'jsonwebtoken';
import { TokenGenerator } from '@domain/services/password-services/TokenGenerator';

export class JwtAdapter implements TokenGenerator {

    generateToken(payload: any): string {
        return jwt.sign(payload, process.env.JWT_SECRET || "Minoria_Secret_Key", { expiresIn: "1h" });
      }

      verifyToken(token: string): any {
        return jwt.verify(token, process.env.JWT_SECRET || "Minoria_Secret_Key");
      }
    }
