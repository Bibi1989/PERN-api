import joi from "@hapi/joi";
import { User, Auth, Contacts } from "./interface";

export const validateUsers = (body: User) => {
  const schema = joi.object({
    username: joi.string().trim(),
    email: joi
      .string()
      .trim()
      .email(),
    password: joi
      .string()
      .trim()
      .min(4)
      .required()
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
    stripUnknown: true
  });

  return {
    error,
    value
  };
};

export const validateAuth = (body: Auth) => {
  const schema = joi.object({
    email: joi
      .string()
      .trim()
      .email(),
    password: joi
      .string()
      .trim()
      .min(4)
      .required()
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
    stripUnknown: true
  });

  return {
    error,
    value
  };
};


export const validateContacts = (body: Contacts) => {
  const schema = joi.object({
    name: joi.string().trim(),
    email: joi
      .string()
      .trim()
      .email(),
    phone: joi
      .string()
      .trim()
      .min(4)
      .required()
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
    stripUnknown: true
  });

  return {
    error,
    value
  };
};
