const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const logger = require('./utils/logger')



const {mongoUrl} = config
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => logger.info('connected to server'))
    .catch(err => logger.error('error connecting to momgodb:',err.message))

app.use(cors())
app.use(express.json())


app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)

module.exports = app