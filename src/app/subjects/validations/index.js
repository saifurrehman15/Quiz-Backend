import Joi from "joi";

const subjectValidate = Joi.object({
    name: Joi.string().min(3).required()
})

export { subjectValidate }