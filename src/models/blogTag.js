// userRole.js
const getBlogTagModel = (sequelize, { DataTypes }) => {
  const BlogTag = sequelize.define("blogTag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  return BlogTag;
};

module.exports = { getBlogTagModel };
