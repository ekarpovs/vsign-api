import * as Joi from '@hapi/joi';
import { IDomainModel } from '../models/domain.model';
import { IUserModel } from '../models/user.model';

export const validateDomain = (data: IDomainModel) => {
  const schema = {
    owner: Joi.string()
      .min(6)
      .required(),
    name: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

export const validateUser = (data: IUserModel) => {
  const schema = {
    access: Joi.array(),
    domain: Joi.string(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    locked: Joi.boolean(),
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

export const validateLogin = (data: any) => {
  const schema = {
    domain: Joi.string()
      .min(6)
      .required(),
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
