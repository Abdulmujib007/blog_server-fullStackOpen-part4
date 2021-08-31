const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async(req,res) => {
    const result = await User.find({}).populate('blog')
    return res.send(result)
})

userRouter.post('/', async(req,res) => {
    const body  = req.body    

    if(!body.username || !body.password) return res.status(400).end()

    if(body.password.length < 3) return res.status(400).send({"error":"invlaid password"}
    )

    const saltRound = 10
    const passwordHash = await bcrypt.hash(body.password,saltRound)

    const user = new User({
        username:body.username,
        password:passwordHash,
        name:body.name
    })

    const result = await user.save()
    return res.status(201).send(result)
})

userRouter.delete('/:id', async(req,res) => {
    const remove = req.params.id

    await  User.findByIdAndDelete(remove)
    res.status(204).send('content deleted')
})

module.exports = userRouter