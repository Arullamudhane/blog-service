const getTokenManagementModel = (sequelize, { DataTypes }) => {
  const Role = sequelize.define(
    "tokenManagement",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token_type: {
        type: DataTypes.ENUM("refresh", "access", "blacklist"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "revoked", "expired", "used", "invalid"),
        defaultValue: "active",
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "token_management",
      timestamps: false,
    }
  );

  return Role;
};

module.exports = { getTokenManagementModel };
