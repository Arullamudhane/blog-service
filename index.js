const express = require("express");
const app = express();
const getUserModel = require("./src/models/user");
const getRoleModel = require("./src/models/role");
const axios = require("axios");
const PORT = process.env.PORT || 3000;
const blogRoutes = require("./src/routes/blogRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { sequelize } = require("./src/config/database");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize("test1", "postgres", "Qwertyuiop3@", {
//   dialect: "postgres",
// });

const version = "/api/v1";

app.use(`${version}/blog`, blogRoutes.blogRoutes);
app.use(`${version}/auth`, authRoutes.authRoutes);

const dotenv = require("dotenv");

// const db = require("./src/config/databaseByPool");

const models = {
  Role: getRoleModel(sequelize, Sequelize),
  User: getUserModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

const User2 = getUserModel(sequelize, Sequelize);

// export default models;

dotenv.config();

// /----------------------------------------------------

// -----------------------

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

console.log("ttt", models);

module.exports = { models, User2 };
