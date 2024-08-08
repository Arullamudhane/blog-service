const getRolePermissionModel = (sequelize, { DataTypes }) => {
  const RolePermission = sequelize.define("rolePermission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  return RolePermission;
};

module.exports = { getRolePermissionModel };
