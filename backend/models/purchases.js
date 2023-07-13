'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchases.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    unitPrice: DataTypes.FLOAT,
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};