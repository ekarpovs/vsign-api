import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import Domain from '../models/domain.model';
import User from '../models/user.model';
import { validateLogin } from '../services/validation.service';
import { createAuthPayload } from '../services/auth.service';

export const login: RequestHandler = async (req, res, next) => {
  // Validate request body
  const { error } = validateLogin(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the domain exists
  const domains = await Domain.find({name: req.body.domain });
  if (!domains[0]) { return res.status(400).send('The domain does not exist'); }
  const domain = domains[0];

  // Check if the user with the name exists in the domain
  const users = await User.find({username: req.body.username, domain: domain._id});
  if (!users[0]) { return res.status(400).send('The user does not exist'); }

  const user = users[0];
  // Password is correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) { return res.status(401).send('Invalid password - debug only'); }

  // Create, sign the payload and assign token
  res.status(200).json(createAuthPayload(user)); // variant
};
