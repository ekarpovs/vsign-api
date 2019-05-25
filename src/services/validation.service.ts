import * as Joi from '@hapi/joi';
import { ICompanyModel } from '../models/company.model';
import { IUserModel } from '../models/user.model';

export const validateCompany = (data: ICompanyModel) => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    nick: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

export const validateUser = (data: IUserModel) => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    name: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

export const validateLogin = (data: any) => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
  };
  return Joi.validate(data, schema);
};
