import { Request, Response, NextFunction, Application } from 'express';
import * as companyController from '../controllers/company.controller';

export const register = ( app: Application ) => {
  app.route('/api/company')
  .get(companyController.list)
  .post(companyController.create);
};
