const Joi = require("joi");

const createReviewSchemaValidation = Joi.object().keys({
    comment: Joi.string().required(),
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5),
    planId: Joi.string().required(),
})

module.exports = {
    createReviewSchemaValidation
}