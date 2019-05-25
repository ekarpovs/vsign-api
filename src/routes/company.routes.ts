import { Request, Response, NextFunction, Application } from 'express';
import * as cc from '../controllers/company.controller';
import { verifyToken } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/company')
  .get(cc.list)
  .post(cc.create);

  app.route('/api/company/:id')
  .get(verifyToken, cc.one)
  .put(verifyToken, cc.update)
  .delete(verifyToken, cc.lock);
};
