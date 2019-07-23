'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    id:{
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    } ,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    password: DataTypes.STRING,
    is_actived: DataTypes.BOOLEAN
  }, {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};