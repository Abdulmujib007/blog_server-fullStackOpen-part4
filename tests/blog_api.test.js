const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/list_helper");
const User = require('../models/user')

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({});

  const blogObject = helper.initialBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 100000);

test("should return json format", async () => {
  await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("should return all blogs ", async () => {
  const response = await api.get("/api/blog");
  expect(response.body).toHaveLength(helper.initialBlog.length);
}, 100000);

test("should have unique identifier ", async () => {
  const response = await api.get(`/api/blog`);
  expect(response.body[0].id).toBeDefined();
}, 100000);

describe("Addition of new blog", () => {
    let headers

  beforeEach(async () => {
    const newUser = {
      username: "indache",
      password: "mujib",
      name: "abdul"
    };
    await api.post("/api/user").send(newUser);

    const result = await api.post("/api/login").send(newUser);
    headers = `bearer ${result.body.token}`;
  },100000);

  test("should add a new blog", async () => {
    const newBlog = {
      title: "strong man",
      author: "mujib",
      url: "asiyanbi.com",
      likes: 10
    };
  
    await api
      .post("/api/blog")
      .set('Authorization',headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlog.length + 1);
  
    const content = blogAtEnd.map((item) => item.title);
    expect(content).toContain("strong man");
  }, 100000);


  test("should add the like property if not defined", async () => {
    const newBlog = {
      title: "this life na dice",
      author: "mujib",
      url: "asiyanbi.com",
    };
  
    await api
      .post("/api/blog")
      .set('Authorization',headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const blogAtEnd = await helper.blogsInDb();
    const lastBlog = blogAtEnd.find((item) => item.title === "this life na dice");
    expect(lastBlog.likes).toBeDefined();
  },100000);


  test("should return error 400 if url and blog title not declared", async () => {
    const newBlog = {
      author: "mujib",
      title: "mujib na bad guy"
    };
    await api.post("/api/blog").set('Authorization',headers).send(newBlog).expect(400);
  }, 100000);
  
});






afterAll(() => {
  mongoose.connection.close();
});
