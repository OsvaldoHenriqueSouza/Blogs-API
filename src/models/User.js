const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true
  });
// ele puxa a tabela
  UserTable.associate = ({ BlogPost }) => {
    UserTable.hasMany(BlogPost, {
      foreignKey: 'user_id', as: 'BlogPost'
    })
  }

  return UserTable
};

module.exports = UserSchema;
