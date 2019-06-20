import { Application } from 'express';
import * as uc from '../controllers/user.controller';
import { checkIfAuthenticated } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/user')
  .get(checkIfAuthenticated, uc.list)
  .post(uc.create);

  app.route('/api/user/:id')
  .get(checkIfAuthenticated, uc.one)
  .put(checkIfAuthenticated, uc.update)
  .delete(checkIfAuthenticated, uc.lock);
};
