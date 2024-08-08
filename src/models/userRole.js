// userRole.js
const getUserRoleModel = (sequelize, { DataTypes }) => {
  const UserRole = sequelize.define("userRole", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // roleId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  });

  return UserRole;
};

module.exports = { getUserRoleModel };
