import { RequestHandler } from 'express';

import Domain from '../models/domain.model';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const nick = req.query.nick;
    const domains = await Domain.find(nick ? {nick} : {});
    if (nick && (domains.length < 1)) {
      return res.status(400).send('The domain does not exists');
    }

    return res.json(nick ? domains[0] : domains);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const newDomain = new Domain(req.body);
  try {
    const domain = await newDomain.save();
    return res.json(domain);
  } catch ( error ) {
    return next(error);
  }
};

export const one: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Domain.findById(id);
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
    const updated = await Domain.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};

export const lock: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = { locked: true };
    const updated = await Domain.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};
