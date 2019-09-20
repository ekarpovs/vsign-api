import { Request, Response, NextFunction, Application } from 'express';
import * as cc from '../controllers/domain.controller';
import { checkIfAuthenticated } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/domains')
  .get(cc.list)
  .post(cc.create);

  app.route('/api/domains/:id')
  .get(checkIfAuthenticated, cc.one)
  .put(checkIfAuthenticated, cc.update)
  .delete(checkIfAuthenticated, cc.lock);
};
