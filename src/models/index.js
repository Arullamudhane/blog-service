const Sequelize = require("sequelize");
const { getUserModel } = require("./user");
const getRoleModel = require("./role");
const dotenv = require("dotenv");
const { sequelize } = require("../config/database");
const { getUserRoleModel } = require("./userRole");

dotenv.config();

const models = {
  // UserRole: getUserRoleModel(sequelize, Sequelize),

  User: getUserModel(sequelize, Sequelize),
  Role: getRoleModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models,
};
