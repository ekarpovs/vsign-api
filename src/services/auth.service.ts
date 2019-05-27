import * as jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import * as config from '../configuration/environment';

  // Create token and sign the payload
export const createAuthPayload = (userId: string) => {
  const token = jwt.sign({id: userId}, config.PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '2h'
  });

  const expDate = Date.now() + 1000 * 60 * 60 * 2; // 2 h from now

  return {idToken: token, expiresIn: expDate};
};

export const checkIfAuthenticated = expressJwt({secret: config.PUBLIC_KEY});
