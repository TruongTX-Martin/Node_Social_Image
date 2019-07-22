'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    path: DataTypes.STRING,
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: 0
    },
    album_id: DataTypes.BIGINT(20),

  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};