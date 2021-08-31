 const blogRouter = require('express').Router()
 const Blog  = require('../models/blog')
 const User = require('../models/user')
 const jwt = require('jsonwebtoken')
 require('dotenv').config()

  


 blogRouter.put('/:id', async (req,res) => {
   const updateId = req.params.id
   const update = await Blog.findByIdAndUpdate(updateId,req.body,{new:true})
   res.send(update)
 })

 blogRouter.delete('/:id', async (req,res) => {
   const removeId = req.params.id
   await  Blog.findByIdAndRemove(removeId)
    res.status(204).end()
 })


 blogRouter.get('/', async(request, response) => {
  const allBlogs = await Blog.find({}).populate('user')
   response.send(allBlogs)
     
  })
  
  blogRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.url || !body.title) return response.status(400).end()
  if(!body.likes) body.likes = 0

  const decodedToken = jwt.verify(request.token,process.env.SECRET)

  if(!decodedToken.id) {
    return res.status(401).send({error:"token missing or invalid"})
    
  }
  
    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes,
      user:user._id
    })
  
    const result = await blog.save()
    // console.log(result)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
      return response.status(201).json(result)
  })

  module.exports = blogRouter