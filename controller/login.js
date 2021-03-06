require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req,res) => {
    const body = req.body

    const user = await User.findOne({username:body.username})
    const correctPassword = user === null 
    ? 
    false 
    :
    await bcrypt.compare(body.password,user.password)
    
    if(!(user && correctPassword)){
        return res.status(401).send({error:"invalid username or password"}
        )
    }
    const userForToken ={
        username:user.username,
        id:user._id
    }
    const token = jwt.sign(userForToken,process.env.SECRET)
    res.status(200).send({token,username:user.username,name:user.name})
})

module.exports = loginRouter
