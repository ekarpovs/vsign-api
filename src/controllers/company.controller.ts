import { RequestHandler } from 'express';

import Company from '../models/company.model';

export const list: RequestHandler = async (req, res, next) => {
  try {
    const companies = await Company.find({});
    return res.json(companies);
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
