const User = require("../models/user");
const bcrypt = require("bcrypt");
const helper = require("../utils/list_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one blog in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("mujib", 10);
    const user = new User({ username: "root", password: passwordHash });

    await user.save();
  }, 100000);

  test("creation fail with proper status code if username already exist", async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      password: "iyanumujib",
      name: "abdul",
    };

    const result = await api
      .post("/api/user")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

      expect(result.body.error).toBeDefined();

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length);
    
  });
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
