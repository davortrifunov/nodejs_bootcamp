const router = require('express').Router()
const userRouter = require('./user.route')
const planRouter = require('./plan.route')
const reviewRouter = require('./review.route')
const passport = require('passport');

router.use('/users', userRouter)
router.use('/plans', passport.authenticate('jwt', { session: false }), planRouter)
router.use('/reviews', passport.authenticate('jwt', { session: false }), reviewRouter)

module.exports = router