import { Request as ExpressRequest } from 'express';
import { User } from '@domain/entities/User';

export interface RequestWithUser extends ExpressRequest {
  user?: User;
}