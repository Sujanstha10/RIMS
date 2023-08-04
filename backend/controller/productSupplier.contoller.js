const model = require("../models");

const addStock = (req, res) => {
  model.productSuppliers
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      let existingQuantity = +result.remainingQuantity;

      console.log("--------");
      let newQuantity = existingQuantity + +req.body.remainingQuantity;
      model.productSuppliers
        .update(
          { remainingQuantity: newQuantity },
          { where: { id: req.params.id } }
        )
        .then((update) => {
          res.status(200).json({
            messege: "stock updated succcessfully!",
          });
        });
    })

    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

const showProductSupplier = (req, res) => {
  model.productSuppliers
    .findAll({
      include: [
        {
          model: model.suppliers,
          attributes: ["supplierName"],
          include: [
            {
              model: model.products,
              attributes: ["productName"],
              through: { attributes: [] },
            },
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "productId", "supplierId"],
      },
    })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })

    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};
module.exports = {
  addStock,
  showProductSupplier,
};
