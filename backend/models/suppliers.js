'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  suppliers.init({
    supplierName: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    contacNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suppliers',
  });
  return suppliers;
};