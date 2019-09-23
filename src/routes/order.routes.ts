import { Application } from 'express';
import * as pc from '../controllers/order.controller';
import { checkIfAuthenticated } from '../services/auth.service';

export const register = ( app: Application ) => {
  app.route('/api/orders')
  .get(checkIfAuthenticated, pc.list)
  .post(checkIfAuthenticated, pc.create);

  app.route('/api/orders/:id')
  .get(checkIfAuthenticated, pc.one)
  .put(checkIfAuthenticated, pc.update)
  .delete(checkIfAuthenticated, pc.remove);
  // .delete(checkIfAuthenticated, pc.lock);
};
