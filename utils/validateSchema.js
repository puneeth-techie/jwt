import Joi from 'joi'

const validateUserSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(16)
})

export {validateUserSchema}