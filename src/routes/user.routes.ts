import { Request, Response, NextFunction, Application } from 'express';
import * as uc from '../controllers/user.controller';
import { verifyToken } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/user')
  .get(verifyToken, uc.list)
  .post(uc.create);

  app.route('/api/user/:id')
  .get(uc.one)
  .put(uc.update)
  .delete(uc.lock);
};
