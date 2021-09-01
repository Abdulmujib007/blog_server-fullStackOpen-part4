const jwt = require('jsonwebtoken')
require('dotenv').config()

const errorHandler = (err,req,res,next) => {
    if(err.name === 'ValidationError'){
      res.status(400).send({error:err.message})
    }

    next(err)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
      req.token= authorization.substring(7)
    }
     return  next()
  }

const userExtractor = (req,res,next) => {
   const user =  jwt.verify(req.token,process.env.SECRET)
    req.user = user.username
   next()
  }

module.exports = {errorHandler,tokenExtractor,userExtractor}