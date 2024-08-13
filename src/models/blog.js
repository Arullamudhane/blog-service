const { types } = require("pg");

const getBlogModel = (sequelize, { DataTypes }) => {
  const Blog = sequelize.define("blog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value, indicating whether the blog is premium content
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default to 0, to count likes
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default to 0, to count dislikes
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { as: "author", foreignKey: "authorId" });
    Blog.belongsToMany(models.Tag, { as: "tags", through: "blogTags" });
    Blog.hasMany(models.Comment, { foreignKey: "blogId", as: "comments" });
  };
  return Blog;
};

module.exports = { getBlogModel };
