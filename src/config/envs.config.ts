import * as Joi from "joi";

export const EnvsValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    ENVIROMENT: Joi.string().valid('development', 'production', 'test').required(),
    FRONT_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PORT: Joi.string().required(),
});