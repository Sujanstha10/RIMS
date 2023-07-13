'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sales.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    unitPrice: DataTypes.FLOAT,
    saleDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sales',
  });
  return sales;
};