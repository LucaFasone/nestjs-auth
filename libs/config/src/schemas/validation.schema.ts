import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(), 
  AUTH_HOST: Joi.string().default('127.0.0.1'), 
  AUTH_PORT: Joi.number().default(3001),
});