const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const passport = require('passport')

const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const results = await UserService.create(data)
        return res.status(200).json({ message: "User was created", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(user, 'your_jwt_secret');
                return res.status(200).json({ message: "Logged in", user, token });
            });
        })(req, res);
    } catch (error) {
        error.code = 401
        next(error)
    }
}



module.exports = {
    createUser,
    loginUser
}
