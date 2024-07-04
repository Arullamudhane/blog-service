const { models, User2 } = require("../../index");
const Sequelize = require("sequelize");
const getUserModel = require("../models/user");

const { sequelize } = require("../config/database");

console.log("ppppp", User2);

async function createUser(userData) {
  console.log("abc");
  const User3 = getUserModel(sequelize, Sequelize);
  console.log("jjnjnjnjnjn", User3);
  //   const User = models.User;
  try {
    const userData = {
      name: "arullll",
      email: "aaaaaaa",
    };
    const newUser = await User3.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

module.exports = { createUser };
