'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsToMany(models.products, {
        through: models.productOrder,
        foreignKey: "orderId",
        otherKey: "productId",
      });
      order.belongsTo(models.customer,{foreignKey:"customerId"})
    }
  }
  order.init({
    customerId: DataTypes.INTEGER,
    productOrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};