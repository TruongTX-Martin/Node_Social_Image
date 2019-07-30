'use strict';
module.exports = (sequelize, DataTypes) => {
  const image_likes = sequelize.define('image_likes', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    image_id: DataTypes.BIGINT(20),
    user_id: DataTypes.BIGINT(20),
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Math.floor(Date.now() / 1000)
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Math.floor(Date.now() / 1000)
    },

  }, {});
  image_likes.associate = function(models) {
    // associations can be defined here
  };
  return image_likes;
};