'use strict';
module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('posts', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    user_id: DataTypes.BIGINT(20),
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Math.floor(Date.now() / 1000)
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    underscored: true
  });
  album.associate = function(models) {
    // associations can be defined here
  };
  return album;
};