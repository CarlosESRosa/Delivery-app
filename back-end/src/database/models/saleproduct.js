const SaleProduct = (sequelize, DataTypes) => {
  const Sale = sequelize.define('SaleProduct', {
    sale_id: { foreignKey: true, primaryKey: true,  type: DataTypes.INTEGER },
    product_id: { foreignKey: true, primaryKey: true,  type: DataTypes.INTEGER },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    timestamps: false,
    underscored: true
  });

  return Sale;
}

export default SaleProduct;
