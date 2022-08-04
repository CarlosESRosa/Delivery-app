const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { autoIncrement: true, primaryKey: true,  type: DataTypes.INTEGER },
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    seller_id: { foreignKey: true, type: DataTypes.INTEGER },
    status: DataTypes.STRING(50),
    total_price: DataTypes.DECIMAL(4, 2),
    user_id: { foreignKey: true, type: DataTypes.INTEGER },
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true
  });

  return Sale;
}

export default Sale;
