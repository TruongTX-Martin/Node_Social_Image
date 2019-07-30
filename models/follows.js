'use strict';
module.exports = (sequelize, DataTypes) => {
  const follows = sequelize.define('follows', {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: DataTypes.BIGINT(20),
    following_id: DataTypes.BIGINT(20),
  }, {});
  follows.associate = function(models) {
    // associations can be defined here
  };
  return follows;
};