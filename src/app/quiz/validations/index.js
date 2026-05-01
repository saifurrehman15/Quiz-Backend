import Joi from "joi";

const quizValidate = Joi.object({
    quiz: Joi.object({
        quiz_name: Joi.string().min(3).required(),
        quiz_time: Joi.string().required(),
        active: Joi.number().valid(0, 1).default(1),
        quiz_key: Joi.string().required(),
        subject_id: Joi.string().required()
    }).required(),

    questions: Joi.array().items(
        Joi.object({
            question: Joi.string().required(),

            answer: Joi.number().required(),

            options: Joi.array()
                .items(Joi.string().required())
                .min(2)
                .required(),

            quiz_id: Joi.string().optional(),

            description: Joi.string().optional()
        })
    ).min(1).required()
});

const quizValidateUpdate = Joi.object({
    quiz: Joi.object({
        quiz_name: Joi.string().min(3).optional(),
        quiz_time: Joi.string().optional(),
        active: Joi.number().valid(0, 1).default(1),
        quiz_key: Joi.string().optional(),
        subject_id: Joi.string().optional()
    }).optional(),

    questions: Joi.array().items(
        Joi.object({
            id: Joi.number().optional(),

            destroy: Joi.number().valid(0, 1).default(0),

            question: Joi.string().optional().allow(''),

            answer: Joi.number().optional().default(0),

           options: Joi.array()
  .items(Joi.string().allow('').optional())
  .min(2)
  .optional(),

            quiz_id: Joi.string().optional(),

            description: Joi.string().optional().allow('')
        })
    ).min(1).optional()
});

export { quizValidate, quizValidateUpdate };