'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var _queryInterface$creat;

    return queryInterface.createTable('users', (_queryInterface$creat = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    }, _defineProperty(_queryInterface$creat, 'id', {
      type: Sequelize.INTEGER
    }), _defineProperty(_queryInterface$creat, 'email', {
      type: Sequelize.STRING
    }), _defineProperty(_queryInterface$creat, 'password', {
      type: Sequelize.STRING
    }), _defineProperty(_queryInterface$creat, 'is_actived', {
      type: Sequelize.BOOLEAN
    }), _defineProperty(_queryInterface$creat, 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _defineProperty(_queryInterface$creat, 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _queryInterface$creat));
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};