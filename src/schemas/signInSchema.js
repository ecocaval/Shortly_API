//* Libraries
import Joi from '@hapi/joi'

export const signInSchema = Joi.object({
    email: Joi.string().email().invalid("").required(),
    password: Joi.string().invalid("").required(),
})