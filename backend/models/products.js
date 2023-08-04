"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsToMany(models.suppliers, {
        through:models.productSuppliers,
        foreignKey: "productId",
        otherKey: "supplierId",
      });
      products.belongsToMany(models.order, {
        through: models.productOrder,
        foreignKey: "productId",
        otherKey: "orderId",
      });
    }
  }
  products.init(
    {
      productName: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      quantity: DataTypes.FLOAT,
      unitPrice: DataTypes.FLOAT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
