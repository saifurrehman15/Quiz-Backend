import Joi from "joi";

const subjectValidate = Joi.object({
    name: Joi.string().min(3).required(),
    color:Joi.allow()
})

export { subjectValidate }