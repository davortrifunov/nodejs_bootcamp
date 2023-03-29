const Joi = require("joi");

const createAuthorSchemaValidation = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().min(3).required()
})

module.exports = {
    createAuthorSchemaValidation
}