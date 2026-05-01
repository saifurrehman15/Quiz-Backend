import Joi from "joi";

const userValidate = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

export { userValidate }
