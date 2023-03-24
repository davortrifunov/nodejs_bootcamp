const router = require('express').Router()
const UserController = require('../controllers/user.controller')


router
    .route('/')
    .post(UserController.createUser)

router
    .route('/login')
    .post(UserController.loginUser)




module.exports = router