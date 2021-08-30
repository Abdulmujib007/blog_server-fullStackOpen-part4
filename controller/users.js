const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async(req,res) => {
    const result = await User.find({})
    return res.send(result)
})

userRouter.post('/', async(req,res) => {
    const body  = req.body
    if(!body.username || !body.password) return res.status(400).end()
    const user = new User(body)

    const result = await user.save()
    return res.status(201).send(result)
})

module.exports = userRouter