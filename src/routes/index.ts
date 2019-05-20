import { Request, Response, NextFunction, Application } from 'express';
import * as api from './api.routes';

export const register = ( app: Application ) => {
  // define a route handler for the default home page
  app.get( '/', ( req: Request, res: Response ) => {
    res.send( 'VSign server works!' );
  } );

  api.register( app );
};
