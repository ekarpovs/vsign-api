import { Request, Response, NextFunction, Application } from 'express';

export const register = ( app: Application ) => {
  app.get( '/api/user', ( req: Request, res: Response ) => {
    res.send( 'User called!' );
  } );
};
