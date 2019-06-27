import { RequestHandler } from 'express';

import Company from '../models/company.model';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const nick = req.query.nick;
    const companies = await Company.find(nick ? {nick} : {});
    if (nick && (companies.length < 1)) {
      return res.status(400).send('The company does not exists');
    }

    return res.json(nick ? companies[0] : companies);
  } catch ( error ) {
    return next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const newCompany = new Company(req.body);
  try {
    const company = await newCompany.save();
    return res.json(company);
  } catch ( error ) {
    return next(error);
  }
};

export const one: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Company.findById(id);
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
    const updated = await Company.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};

export const lock: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = { locked: true };
    const updated = await Company.findByIdAndUpdate(id, updateData, { new: true });
    return res.json(updated);
  } catch ( error ) {
    return next(error);
  }
};
