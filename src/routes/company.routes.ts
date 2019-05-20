import { Request, Response, NextFunction, Application } from 'express';

export const register = ( app: Application ) => {
  app.get( '/api/company', ( req: Request, res: Response ) => {
    res.send( 'Company called!' );
  } );
};
