const router = require('express').Router()
const PlanController = require('../controllers/plan.controller')
const { validateBody } = require('../middlewares/validator.middleware')
const { createPlanSchemaValidation } = require('../utils/validations/plan.validation')

router
    .route('/')
    .get(PlanController.listPlans)
    .post(validateBody(createPlanSchemaValidation), PlanController.createPlan)
    .put(PlanController.editPlan)
    .delete(PlanController.deletePlan)

router
    .route('/subs')
    .get(PlanController.listSubscribers)

router
    .route('/coach')
    .get(PlanController.listPlansByCoach)

router
    .route('/subscribe')
    .post(PlanController.subscribe)
    .get(PlanController.listSubscriptions)

module.exports = router