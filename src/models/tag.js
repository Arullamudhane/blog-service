const getTagModel = (sequelize, { DataTypes }) => {
  const Tag = sequelize.define("tag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Blog, { as: "tags", through: "blogTags" });
  };

  return Tag;
};

module.exports = { getTagModel };
