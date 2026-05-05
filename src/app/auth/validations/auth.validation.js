import Joi from "joi";

const registerValidate = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const cheatedValidation = Joi.object({
    reason: Joi.string().min(3).default('Press Key'),
});

export { registerValidate, loginValidation, cheatedValidation }