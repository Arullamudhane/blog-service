const express = require("express");
const app = express();
// const getUserModel = require("./src/models/user");
// const getRoleModel = require("./src/models/role");
const axios = require("axios");
const PORT = process.env.PORT || 3000;
const blogRoutes = require("./src/routes/blogRoutes");
const authRoutes = require("./src/routes/authRoutes");
const commentRoutes = require("./src/routes/commentsRoutes");
const { sequelize } = require("./src/models");
const Sequelize = require("sequelize");

const version = "/api/v1";

app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(`${version}/blog`, blogRoutes.blogRoutes);
app.use(`${version}/auth`, authRoutes.authRoutes);
// app.use(`${version}/blog/:blogId/comment`, commentRoutes.commentRoutes);

app.use(
  `${version}/blog/:blogId/comment`,
  (req, res, next) => {
    req.body.blogId = req.params.blogId;
    next();
  },
  commentRoutes.commentRoutes
);

app.use(`${version}/comment`, commentRoutes.commentRoutes);

app.get(`${version}/test`, (req, res) => {
  console.log("pppp");
  console.log(req.body);
});

const dotenv = require("dotenv");
const { createRolesAndPermissions } = require("./src/service/roleService");

// const db = require("./src/config/databaseByPool");

dotenv.config();

sequelize
  .sync({ force: false, alter: true })
  .then(async () => {
    // await createRolesAndPermissions();
    app.listen(PORT, () => {
      console.log(`E11xample app listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// console.log("ttt", models);

// module.exports = { models };
