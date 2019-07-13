import { Request, Response, NextFunction, Application } from 'express';
import * as api from './api.routes';
import * as auth from './auth.routes';

export const register = ( app: Application ) => {
  // define a route handler for the default home page
  app.get( '/', ( req: Request, res: Response ) => {
    res.send( 'VSign server works!' );
  } );

  api.register( app );
  auth.register( app );

  app.get( '*', ( req: Request, res: Response ) => {
    res.status(404).send();
  } );
};
