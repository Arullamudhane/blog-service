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
    Role.hasMany(models.User, { foreignKey: "role_id" });
    // Role.hasMany(models.User, { foreignKey: "roles.id" });
  };

  return Role;
};

module.exports = getRoleModel;
