'use strict';

module.exports = function (sequelize, DataTypes) {
  var album = sequelize.define('album', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  album.associate = function (models) {
    // associations can be defined here
  };
  return album;
};