const Sequelize = require("sequelize");

const sequelize = new Sequelize("test1", "postgres", "Qwertyuiop3@", {
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize };
