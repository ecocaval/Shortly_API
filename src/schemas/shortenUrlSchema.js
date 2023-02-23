//* Libraries
import Joi from '@hapi/joi'

const regexUrlPattern = /^https:\/\/.*/

export const shortenUrlSchema = Joi.object({
    url: Joi.string().regex(regexUrlPattern).required()
})