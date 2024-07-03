const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    google_id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture_url: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.UUID,
      references: {
        model: "roles", // name of the target model
        key: "id", // key in the target model that we're referencing
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Role);
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

module.exports = getUserModel;
