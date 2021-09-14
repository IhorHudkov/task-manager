import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../src/models/user.js";
import Task from "../../src/models/task.js";

export const userOneId = new mongoose.Types.ObjectId();
export const userTwoId = new mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  name: "Ihor",
  email: "ihor@example.com",
  password: "ihor123!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

export const userTwo = {
  _id: userTwoId,
  name: "Suzy",
  email: "suzy@example.com",
  password: "suzy123!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

export const taskOne = {
  _id: mongoose.Types.ObjectId(),
  description: "first task",
  completed: true,
  owner: userOne._id,
};

export const taskTwo = {
  _id: mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userTwo._id,
};

export const taskThree = {
  _id: mongoose.Types.ObjectId(),
  description: "third task",
  completed: true,
  owner: userOne._id,
};

export const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};
