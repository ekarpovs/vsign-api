import { Application } from 'express';
import * as pc from '../controllers/product.controller';
import { checkIfAuthenticated } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/product')
  .get(checkIfAuthenticated, pc.list)
  .post(checkIfAuthenticated, pc.create);

  app.route('/api/product/:id')
  .get(checkIfAuthenticated, pc.one)
  .put(checkIfAuthenticated, pc.update)
  .delete(checkIfAuthenticated, pc.lock);
};
