'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    path: DataTypes.STRING,
    post_id: DataTypes.BIGINT(20),
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Math.floor(Date.now() / 1000)
    },

  }, {
    underscored: true
  });
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};