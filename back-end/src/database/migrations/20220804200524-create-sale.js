'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      sellerId: {
        allowNull: false,
        field: 'seller_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL(9, 2)
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: Sequelize.STRING(100)
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING(50)
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING(50)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};