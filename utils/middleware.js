const errorHandler = (err,req,res,next) => {
    if(err.name === 'ValidationError'){
        return res.status(400).send({"error":err.message})
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

module.exports = {errorHandler,tokenExtractor}