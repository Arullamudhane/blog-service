const { models } = require("../models");
const createRolesAndPermissions = async () => {
  const permission = models.Permission;

  const existingPermissions = await permission.findAll({
    where: {
      name: ["createBlog", "deleteBlog", "editBlog", "viewBlog", "shareBlog"],
    },
  });

  //   console.log("tttttt", existingPermissions);
  if (existingPermissions.length === 0) {
    await permission.bulkCreate([
      { name: "createBlog", description: "createBlog" },
      { name: "deleteBlog", description: "deleteBlog" },
      { name: "editBlog", description: "editBlog" },
      { name: "viewBlog", description: "viewBlog" },
      { name: "shareBlog", description: "shareBlog" },
    ]);
  }

  //
  const Role = models.Role;
  const [superAdminRole, created] = await Role.findOrCreate({
    where: { name: "superAdmin" },
    defaults: { description: "Super Administrator with full access" },
  });

  if (created) {
    console.log("SuperAdmin role created.");
  }

  const permissions = await permission.findAll({
    where: {
      name: ["createBlog", "deleteBlog", "editBlog", "viewBlog", "shareBlog"],
    },
  });

  const User = models.User;

  let ttt = await User.create({
    //   id: "d6e29c02-6325-4d3c-9abf-6bce67a4f25d", // you can provide your own UUID or let Sequelize generate it
    name: "bjaaaohn_doje",
    email: "john_doje@example.com",
    password: "password123", // In a real application, ensure the password is hashed
  });

  let ttt2 = await User.create({
    //   id: "d6e29c02-6325-4d3c-9abf-6bce67a4f25d", // you can provide your own UUID or let Sequelize generate it
    name: "arulljare",
    email: "john_ddoje@example.com",
    password: "password123", // In a real application, ensure the password is hashed
  });

  const users = await models.User.findAll({
    where: {
      name: ["bjaaaohn_doje"],
    },
  });

  const users2 = await models.User.findAll({
    where: {
      name: ["arulljare"],
    },
  });
  console.log("hh", users);

  await superAdminRole.addUsers(users);
  await superAdminRole.addUsers(users2);

  //   await superAdminRole.
  // await superAdminRole.ad
  // await superAdminRole.ad

  await superAdminRole.addPermissions(permissions);
};

module.exports = { createRolesAndPermissions };
