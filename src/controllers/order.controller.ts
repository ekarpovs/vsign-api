import { RequestHandler } from 'express';

import Order from '../models/order.model';
import { validateUser } from '../services/validation.service';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const domain = req.query.domain;
    const products = await Order.find(domain ? {domain} : {});
    return res.json(products);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  // Validate request body
  // const { error } = validateProduct(req.body);
  // if (error) { return res.status(400).send(error.details[0].message); }

  // Check if the user with the name already exists
  const nameExist = await Order.findOne({name: req.body.name});
  if (nameExist) { return res.status(400).send('The product already exists'); }

  const newProduct = new Order({
    description: req.body.description,
    domain: req.body.domain,
    locked: false,
    name: req.body.name
  });

  try {
    const product = await newProduct.save();
    return res.json(product);
  } catch ( error ) {
    return next(error);
  }
};

export const one: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Order.findById(id);
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
    const updated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};

export const lock: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = { locked: true };
    const updated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};
