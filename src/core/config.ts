import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

const joiSchema = joi.object({
  NODE_HOST: joi.string().required(),
  NODE_PORT: joi.number().required(),
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required()
}).unknown(true);

const { error } = joiSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  node: {
    host: process.env.NODE_HOST || 'localhost',
    port: parseInt(process.env.NODE_PORT || '3000', 10),
  },
  db: {
    name: process.env.DB_NAME || 'eldorado',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
};