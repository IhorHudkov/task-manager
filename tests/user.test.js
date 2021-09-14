import request from "supertest";
import { userOne, userOneId, setupDatabase } from "./fixtures/db.js";
import app from "../src/app.js";
import User from "../src/models/user.js";

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Sam",
      email: "sam@example.com",
      password: "sam123!",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBe(null);

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Sam",
      email: "sam@example.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("sam123!");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBe(null);
  expect(user.tokens[1].token).toBe(response.body.token);
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

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete accont for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Sam",
      email: "sam@example.com",
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user.name).toEqual("Sam");
  expect(user.email).toBe("sam@example.com");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Boston",
    })
    .expect(400);
});
