import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { validateLogin } from '../services/validation.service';

export const login: RequestHandler = async (req, res, next) => {
  // Validate request body
  const { error } = validateLogin(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the user with the name exists
  const user = await User.findOne({name: req.body.name});
  if (!user) { return res.status(400).send('The user does not exist'); }

  // Password is correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) { return res.status(400).send('Invalid password - debug only'); }

  // Create and assign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
};
