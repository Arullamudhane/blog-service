const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    provider_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture_url: {
      type: DataTypes.STRING,
    },
    registration_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    // User.belongsToMany(models.Role, {
    //   through: models.Role,
    //   foreignKey: "userId",
    // });

    User.belongsToMany(models.Role, { through: "userRoles" });
    // User.belongsTo(models.Role, { foreignKey: "roles.id" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };
  return User;
};

module.exports = { getUserModel };
