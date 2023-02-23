//* Libraries
import Joi from '@hapi/joi'

export const signUpSchema = Joi.object({
    name: Joi.string().trim().invalid("").required(),
    email: Joi.string().email().trim().invalid("").required(),
    password: Joi.string().invalid("").required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})