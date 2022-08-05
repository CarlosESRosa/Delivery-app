const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { autoIncrement: true, primaryKey: true,  type: DataTypes.INTEGER },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING(200),
  }, {
    tableName: 'products',
    timestamps: false,
    underscored: true
  });

  return Product;
}

module.exports = Product;
