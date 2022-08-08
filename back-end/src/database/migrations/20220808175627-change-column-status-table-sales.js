'use strict';

const { DataTypes } = require("sequelize/types");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'status', {
      type: DataTypes.STRING(50),
      defaultValue: 'Pendente'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'status', {
      type: DataTypes.STRING(50),
    });
  }
};
