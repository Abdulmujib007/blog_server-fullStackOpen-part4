const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

const api = supertest(app)



   beforeEach( async () => {
       await Blog.deleteMany({})
       
       let blogObject = new Blog(helper.initialBlog[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlog[1])
        await blogObject.save()
   },100000)

   test('should return json format', async () => {
    await 
        api.get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    },100000)


   test('should return all blogs ', async () => {
       const response = await api.get('/api/blog')
        
       expect(response.body).toHaveLength(helper.initialBlog.length)
   },100000)

   test('should have unique identifier ', async () => {
         const response = await api.get('/api/blog')
        expect(response.body[0].id).toBeDefined()

   },100000)
   

   

    afterAll(() => {
        mongoose.connection.close()
      })
   