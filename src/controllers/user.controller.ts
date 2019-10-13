import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import User from '../models/user.model';
import { validateUser } from '../services/validation.service';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const domain = req.query.domain;
    const users = await User.find(domain ? {domain} : {});
    return res.json(users);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  // Validate request body
  const { error } = validateUser(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the user with the name && domain already exists -
  // additional to DB indexes definitions - need to send user friendly message
  const nameExist = await User.findOne({username: req.body.username, domain: req.body.domain});
  if (nameExist) { return res.status(400).send('The user already exists'); }

  const { password, ...rest } = req.body;
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    password: hashedPassword,
    ...rest
  });

  try {
    const user = await newUser.save();

    return res.json(user);
  } catch ( error ) {
    return next(error);
  }
};

export const one: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await User.findById(id);

    return res.json(item);
  } catch ( error ) {
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password, ...updateData } = req.body;

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });

    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};

export const lock: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = { locked: true };
    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    return res.json(user);
  } catch ( error ) {
    return next(error);
  }
};
