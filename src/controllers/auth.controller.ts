import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import User from '../models/user.model';
import { validateLogin } from '../services/validation.service';
import { createAuthPayload } from '../services/auth.service';

export const login: RequestHandler = async (req, res, next) => {
  // Validate request body
  const { error } = validateLogin(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the user with the name exists in the domain
  const fres = await User.find({username: req.body.username, domain: req.body.domain});
  if (!fres[0]) { return res.status(400).send('The user does not exist'); }

  const user = fres[0];
  // Password is correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) { return res.status(401).send('Invalid password - debug only'); }

  // Create, sign the payload and assign token
  res.status(200).json(createAuthPayload(user)); // variant
};
