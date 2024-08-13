const { models } = require(".");
const { sequelize } = require("../config/database");

const getCommentModel = (sequelize, { DataTypes }) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },

    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Blog, { foreignKey: "blogId", as: "blog" });
  };

  return Comment;
};

module.exports = { getCommentModel };
