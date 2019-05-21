import { RequestHandler } from 'express';

import User from '../models/user.model';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    return res.json(user);
  } catch ( error ) {
    return next(error);
  }
};
