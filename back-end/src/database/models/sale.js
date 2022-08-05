const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { autoIncrement: true, primaryKey: true,  type: DataTypes.INTEGER },
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    sellerId: { foreignKey: true, type: DataTypes.INTEGER },
    status: DataTypes.STRING(50),
    totalPrice: DataTypes.DECIMAL(4, 2),
    userId: { foreignKey: true, type: DataTypes.INTEGER },
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller'
    });
  }

  return Sale;
}

module.exports = Sale;
