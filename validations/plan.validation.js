const Joi = require("joi");

const createPlanSchemaValidation = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    userId: Joi.number()
        .integer().required(),
})

module.exports = {
    createPlanSchemaValidation
}