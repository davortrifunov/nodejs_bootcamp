const router = require('express').Router()
const ReviewController = require('../controllers/review.controller');
const { validateBody } = require('../middlewares/validator.middleware')
const { createReviewSchemaValidation } = require('../utils/validations/review.validation')

router
    .route('/')
    .post(validateBody(createReviewSchemaValidation), ReviewController.createReview);

router
    .route('/subscriber')
    .get(ReviewController.subscriberReviews);

router
    .route('/coach')
    .get(ReviewController.coachReviews);



module.exports = router 