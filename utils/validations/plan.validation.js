const Joi = require("joi");

const createPlanSchemaValidation = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    userId: Joi.number()
        .integer().required(),
})


const editPlanSchemaValidation = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    id: Joi.number(),

})

module.exports = {
    createPlanSchemaValidation,
    editPlanSchemaValidation
}