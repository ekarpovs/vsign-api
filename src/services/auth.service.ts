import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.header('auth-token');
  if (!token) { return res.status(400).send('Access denied'); }

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
