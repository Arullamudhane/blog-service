const getPermissionModel = (sequelize, { DataTypes }) => {
  const Permission = sequelize.define("permission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, { through: "rolePermissions" });
  };

  return Permission;
};

module.exports = { getPermissionModel };
