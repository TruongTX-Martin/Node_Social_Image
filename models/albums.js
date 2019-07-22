'use strict';
module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('albums', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    user_id: DataTypes.BIGINT(20)
  }, {});
  album.associate = function(models) {
    // associations can be defined here
  };
  return album;
};