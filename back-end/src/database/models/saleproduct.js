const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: { foreignKey: true, primaryKey: true,  type: DataTypes.INTEGER },
    productId: { foreignKey: true, primaryKey: true,  type: DataTypes.INTEGER },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    timestamps: false,
    underscored: true
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id'    
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id'      
    })
  };

  return SaleProduct;
}

export default SaleProduct;
