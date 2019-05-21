import { Request, Response, NextFunction, Application } from 'express';
import * as uc from '../controllers/user.controller';

export const register = ( app: Application ) => {
  app.route('/api/user')
  .get(uc.list)
  .post(uc.create);
};
