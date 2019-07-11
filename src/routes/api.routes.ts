import { Request, Response, Application } from 'express';
import * as domain from './domain.routes';
import * as user from './user.routes';
import * as product from './product.routes';

export const register = ( app: Application ) => {
  app.get( '/api', ( req: Request, res: Response ) => {
    res.send( 'Api called!' );
  } );

  domain.register( app );
  user.register( app );
  product.register( app );
};
