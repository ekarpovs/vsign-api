import { NextFunction, Request, Response, RequestHandler } from 'express';
import companySchemaModel from '../models/company.model';
import { Result } from 'range-parser';

const csm = companySchemaModel;

export const list: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await csm.find({});
    return res.status(200).json(companies);
  } catch ( error ) {
    return res.status(500).json(error);
  }
};

export const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const newCsm = new csm(req.body);
  try {
    const company = await newCsm.save();
    return res.status(200).json(company);
  } catch ( error ) {
    return res.status(500).json(error);
  }
};
