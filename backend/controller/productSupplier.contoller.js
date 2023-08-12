const model = require("../models");

const addStock = (req, res) => {
  model.productSuppliers
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      let existingQuantity = +result.remainingQuantity;

      let newQuantity = existingQuantity + +req.body.remainingQuantity;
      model.productSuppliers
        .update(
          { remainingQuantity: newQuantity },
          { where: { id: req.params.id } }
        )
        .then((update) => {
          res.status(200).json({
            message: "stock updated succcessfully!",
          });
        });
    })

    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const showProductSupplier = (req, res) => {
  model.suppliers
  .findAll({
    
    // where: { id: req.params.id },
    include: [
      {
        model: model.products,
        attributes: ["productName"],
        through: { attributes: ["remainingQuantity"] }, // Include remainingQuantity from the junction table
      },
    ],
    attributes: ["supplierName"],
  })
  
  // model.productSuppliers
  // .findAll({
  //   include: [
  //     {
  //       model: model.suppliers,
  //       attributes: ["supplierName"],
  //     },
  //     {
  //       model: model.products,
  //       attributes: ["productName"],
  //       through: { attributes: ["remainingQuantity"] }, // Include remainingQuantity from the junction table
  //     },
  //   ],
  //   attributes: [],
  // })


  // model.productSuppliers
  //   .findAll({
  //     include: [
  //       {
  //         model: model.suppliers,
  //         attributes: ["supplierName"],
  //         include: [
  //           {
  //             model: model.products,
  //             attributes: ["productName"],
  //             through: { attributes: ["remainingQuantity"] }, // Include remainingQuantity from the junction table
  //           },
  //         ],
  //       },
  //     ],
  //     attributes: [],
  //   })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })

    .catch((error) => {
      res.status(500).json({
        message: error.message,

        // error,
      });
    });
};

const showProductSupplierById = (req, res) => {
  model.suppliers
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: model.products,
          attributes: ["productName"],
          through: { attributes: ["remainingQuantity"] }, // Include remainingQuantity from the junction table
        },
      ],
      attributes: ["supplierName"],
    })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })

    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

module.exports = {
  addStock,
  showProductSupplier,
  showProductSupplierById,
};
