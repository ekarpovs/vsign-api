import { NextFunction, Request, Response, RequestHandler } from 'express';
import CompanySchema from '../models/company.model';

const cs = CompanySchema;

export const list: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await cs.find({});
    return res.status(200).json(companies);
  } catch ( error ) {
    return res.status(500).json(error);
  }
};

export const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCompany = new cs(req.body);
    const company = await newCompany.save();
    return res.status(200).json(company);
  } catch ( error ) {
    return res.status(500).json(error);
  }
};
