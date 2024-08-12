const Sequelize = require("sequelize");
const { getUserModel } = require("./user");
const getRoleModel = require("./role");
const dotenv = require("dotenv");
const { sequelize } = require("../config/database");
const { getUserRoleModel } = require("./userRole");
const { getPermissionModel } = require("./permission");
const { getRolePermissionModel } = require("./rolePermission");
const { getTokenManagementModel } = require("./tokenManagement");

dotenv.config();

const models = {
  // UserRole: getUserRoleModel(sequelize, Sequelize),
  UserRole: getUserRoleModel(sequelize, Sequelize),
  RolePermission: getRolePermissionModel(sequelize, Sequelize),

  User: getUserModel(sequelize, Sequelize),
  Role: getRoleModel(sequelize, Sequelize),
  Permission: getPermissionModel(sequelize, Sequelize),
  TokenManagement: getTokenManagementModel(sequelize, Sequelize),
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
