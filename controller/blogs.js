 const blogRouter = require('express').Router()
 const Blog  = require('../models/blog')


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
  const allBlogs = await Blog.find({})
   response.send(allBlogs)
     
  })
  
  blogRouter.post('/', async (request, response) => {
    if(!request.body.url || !request.body.title) return response.status(400).end()
  

    if(!request.body.likes) request.body.likes = 0

    const blog = new Blog(request.body)
  
    const result = await blog.save()
      return response.status(201).json(result)
  })

  module.exports = blogRouter