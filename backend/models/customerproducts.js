'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customerProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customers)
      this.belongsTo(models.products)
    }
  }
  customerProducts.init({
    customerId:  {
      type: DataTypes.INTEGER,
      references:{
        model: 'customers',
        key:'id'
      },
      onDelete:'CASCADE'

    },
    productId:  {
      type: DataTypes.INTEGER,
      references:{
        model: 'products',
        key:'id'
      },        
      onDelete:'CASCADE'

    },
  }, {
    sequelize,
    modelName: 'customerProducts',
  });
  return customerProducts;
};