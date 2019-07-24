import * as jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import * as config from '../configuration/environment';

  // Create token and sign the payload
export const createAuthPayload = (user: any) => {
  // may request other aAPI
  const token = jwt.sign({id: user._id}, config.PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '2h'
  });

  // Additional info
  const expDate = Date.now() + 1000 * 60 * 60 * 2; // 2 h from now
  const currentUser = {
    access: user.access,
    domain: user.domain,
    id: user._id,
    username: user.username
  };

  return { idToken: token, expiresIn: expDate, currentUser };
};
// @TODO: Move to separate service
export const checkIfAuthenticated = expressJwt({secret: config.PUBLIC_KEY});
