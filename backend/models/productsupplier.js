'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productSuppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.productSuppliers.belongsTo(models.products, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    
      models.productSuppliers.belongsTo(models.suppliers, {
        foreignKey: 'supplierId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  productSuppliers.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    supplierId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'suppliers',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    remainingQuantity: DataTypes.FLOAT,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'productSuppliers',
  });
  return productSuppliers;
};