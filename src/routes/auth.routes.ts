import { Request, Response, NextFunction, Application } from 'express';
import * as ac from '../controllers/auth.controller';

export const register = ( app: Application ) => {
  app.route('/auth/login')
  .post(ac.login);
};
