const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.prefs({ abortEarly: false }).validate(req.body)
    if(error){
        console.log(error)
        const errorMessage = error.details.map((details) => details.message).join(', ')
        return res.status(422).json({message: "Validation errors", errors: errorMessage})
    }
    next()
}

module.exports = {
    validateBody
}