const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
  timestamps: false,
  underscored: true,
  tableName: 'blog_posts'});
// ele dá para outra tabela
  BlogPostTable.associate = ({ User }) => {
    BlogPostTable.belongsTo(User,
      { foreignKey: 'user_id', as: 'user' });
  };
  return BlogPostTable;
};

module.exports = BlogPostSchema;
