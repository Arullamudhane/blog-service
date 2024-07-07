// const { models, User2 } = require("../../index");
const Sequelize = require("sequelize");
// const getUserModel = require("../models/user");

const { sequelize, models } = require("../models");

// console.log("ppppp", User2);

async function createUser(userData) {
  console.log("abc");
  //   const User3 = getUserModel(sequelize, Sequelize);
  const User = models.User;
  const Role = models.Role;
  console.log("jjnjnjnjnjn", User);

  try {
    // const userData = {
    //   name: "arullll",
    //   email: "aaaaaaa",
    // };
    // const newUser = await User.create(userData);
    const rolee = await Role.create({
      //   id: "d6e29c02-6325-4d3c-9abf-6bce67a4f25d", // you can provide your own UUID or let Sequelize generate it
      name: "admin",
      description: "Administrator with full access",
    });
    console.log("====>", rolee);
    await User.create({
      //   id: "d6e29c02-6325-4d3c-9abf-6bce67a4f25d", // you can provide your own UUID or let Sequelize generate it
      name: "bjaaaohn_doje",
      email: "john_doje@example.com",
      password: "password123", // In a real application, ensure the password is hashed
      role_id: rolee.id, // This should be the UUID of the admin role
    });

    return 1;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

module.exports = { createUser };
