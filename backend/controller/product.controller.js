const model = require("../models");

//add product
const addproduct = (req, res) => {
  const product = {
    productName: req.body.productName,
    categoryId: req.body.categoryId,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    supplierId: req.body.supplierId,
    image: req.file ? req.file.path : null,
  };

  model.products.findOne({ where: { productName: req.body.productName } }).then((exist) => {
    if (exist) {
      let existingQuantity = +exist.quantity
      let newQuantity = existingQuantity + (+req.body.quantity)
      model.products
        .update({ quantity: newQuantity }, { where: { id: exist.id } })
        .then((update) => {
          res.status(200).json({
            messege: "stock updated succcessfully!",
          });
        })
    } else {
      model.products
        .create(product)
        .then((Result) => {
          res.status(200).json({
            message: "product added successfully",
            result: product,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            err,
          });
        });

    }
  })
};

const addStock = (req, res) => {
  model.products
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        const existingQuantity = result.quantity
        const newQuantity = existingQuantity + req.body.quantity
        model.products
          .update({ quantity: newQuantity }, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "stock updated succcessfully!",
            });
          })
        }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
}



//read all product
const allproduct = (req, res) => {
  model.products
    .findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//read product
const showproduct = (req, res) => {
  model.products
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(401).json({ message: "product not found" });
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//delete product
const deleteproduct = (req, res) => {
  model.products
    .destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `product  deleted`,
        });
      } else {
        res.status(404).json({
          messege: `product not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong.",
      });
    });
};

//update product
const updateproduct = (req, res) => {
  model.products
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedproduct = {
          productName: req.body.productName,
          categoryId: req.body.categoryId,
          quantity: req.body.quantity,
          unitPrice: req.body.unitPrice,
          supplierId: req.body.supplierId,
          image: req.file ? req.file.path : null,
        };
        model.products
          .update(editedproduct, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "product updated succcessfully!",
              update: editedproduct,
            });
          })
          .catch((err) => {
            res.status(500).json({
              messege: "something went wrong!",
              err,
            });
          });
      } else {
        res.status(401).json({
          messege: "product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "something went wrong",
        err,
      });
    });
};

module.exports = {
  addproduct,
  allproduct,
  showproduct,
  deleteproduct,
  updateproduct,
  addStock
};
