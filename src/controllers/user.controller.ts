import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import User from '../models/user.model';
import { validateUser } from '../services/validation.service';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const company = req.query.company;
    const users = await User.find(company ? {company} : {});
    return res.json(users);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  // Validate request body
  const { error } = validateUser(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the user with the name already exists
  const nameExist = await User.findOne({name: req.body.name});
  if (nameExist) { return res.status(400).send('The user already exists'); }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    access: req.body.access,
    company: req.body.company,
    email: req.body.email,
    locked: false,
    name: req.body.name,
    password: hashedPassword
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
    const newItem = req.body;
    const { ...updateData } = newItem;
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
