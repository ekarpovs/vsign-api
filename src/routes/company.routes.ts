import { Request, Response, NextFunction, Application } from 'express';
import * as cc from '../controllers/company.controller';
import { checkIfAuthenticated } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/company')
  .get(checkIfAuthenticated, cc.list)
  .post(cc.create);

  app.route('/api/company/:id')
  .get(checkIfAuthenticated, cc.one)
  .put(checkIfAuthenticated, cc.update)
  .delete(checkIfAuthenticated, cc.lock);
};
