'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    } ,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_actived: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'user'
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};