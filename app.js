const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const helmet = require('helmet')
const router = require('./routes/index.route')
require('./passport')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())

app.use('/', router)

app.use((err, req, res, next) => {
    console.log('What is the error?')
    if (err && err.code && err.code == 401) {
        return res.status(err.code).json({ message: "Invalid data sent" })
    }
    if (err && err.code && err.code == 400) {
        return res.status(err.code).json({ message: err.message })
    }
    return res.status(500).json({ message: err.message })
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})