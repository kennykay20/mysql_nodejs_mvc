const dotenv = require('dotenv');
const joi = require('joi');

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

// validating environment variables
const schemaValidate = joi
  .object({
    HTTP_PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid("development", "staging", "production")
      .required(),
    DB_HOST: joi.string(),
    DB_PORT: joi.number(),
    DB_USER: joi.string(),
    DB_PASSWORD: joi.string(),
    DB_DATABASE: joi.string(),
    SECRET: joi.string(),
  })
  .unknown()
  .required();

const { error, value: envVar } = schemaValidate.validate(process.env);

if (error) {
  throw new Error(`config validation error ${error.message}`);
}

const nonProdEnvironments = ["development", "dev", "staging"];

exports.config = {
  port: {
    HTTP_PORT: envVar.HTTP_PORT,
  },
  NODE_ENV: envVar.NODE_ENV,
  DB: {
    HOST: envVar.DB_HOST,
    PORT: envVar.DB_PORT,
    USER: envVar.DB_USER,
    PASSWORD: envVar.DB_PASSWORD,
    DATABASE: envVar.DB_DATABASE
  },
  Secret: envVar.SECRET,
};
