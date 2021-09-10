import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/user.js";


const userOne = {
  name: "Ihor",
  email: "ihor@example.com",
  password: "ihor123!",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Sam",
      email: "sam@example.com",
      password: "sam123!",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should non login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "kurt@example.com",
      password: "qwerty",
    })
    .expect(400);
});
