'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    image_id: DataTypes.BIGINT(20),
    post_id: DataTypes.BIGINT(20),
    user_id_comment: DataTypes.BIGINT(20),
    comment: DataTypes.STRING,
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
  };
  return comments;
};