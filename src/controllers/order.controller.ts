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
  // const { error } = validateOrder(req.body);
  // if (error) { return res.status(400).send(error.details[0].message); }

  const { amount, creator, description, domain, product, status } = req.body;
  const newDoc = new Order({
    amount,
    creator,
    description,
    domain,
    product,
    status
  });

  try {
    const doc = await newDoc.save();
    return res.json(doc);
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

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndRemove(id);
    return res.json(order);
  } catch ( error ) {
    return next(error);
  }
};
