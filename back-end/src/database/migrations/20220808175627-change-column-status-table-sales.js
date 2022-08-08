module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'status', {
      type: Sequelize.STRING(50),
      defaultValue: 'Pendente'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'status', {
      type: Sequelize.STRING(50),
    });
  }
};
