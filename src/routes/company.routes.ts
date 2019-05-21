import { Request, Response, NextFunction, Application } from 'express';
import * as cc from '../controllers/company.controller';

export const register = ( app: Application ) => {
  app.route('/api/company')
  .get(cc.list)
  .post(cc.create);

  app.route('/api/company/:id')
  .get(cc.one)
  .put(cc.update)
  .delete(cc.lock);
};
