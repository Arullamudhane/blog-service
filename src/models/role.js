const getRoleModel = (sequelize, { DataTypes }) => {
  const Role = sequelize.define("jrole", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    // created_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
  });
  Role.associate = (models) => {
    Role.belongsToMany(models.User, { through: "userRoles" });
    Role.belongsToMany(models.Permission, { through: "rolePermissions" });
  };

  return Role;
};

module.exports = getRoleModel;
