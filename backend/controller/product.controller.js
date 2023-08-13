const model = require("../models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

// //add product
// const addproduct = async (req, res) => {
//   const product = {
//     productName: req.body.productName,
//     categoryId: req.body.categoryId,
//     quantity: req.body.quantity,
//     unitPrice: req.body.unitPrice,
//     image: req.file ? req.file.path : null,
//   };

//   await model.products
//     .findOne({ where: { productName: req.body.productName } })
//     .then((existProduct) => {
//       const id = existProduct.id;
//       if (existProduct) {
//         let oldQuantity = existProduct.quantity;
//         let updateQuantity = oldQuantity + req.body.quantity;
//         model.products.update(
//           { quantity: updateQuantity },
//           { where: { id: existProduct.id } }
//         );
//         model.productSuppliers
//           .findAll({ where: { productId: existProduct.id } })
//           .then((result) => {
//             model.productSuppliers
//               .findOne({ where: { supplierId: req.body.supplierId } })
//               .then((existProductSupplier) => {
//                 // console.log(existProductSupplier.productId);
//                 if (existProductSupplier) {
//                   let existingQuantity =
//                     +existProductSupplier.remainingQuantity;
//                   let newQuantity = existingQuantity + +req.body.quantity;
//                   model.productSuppliers
//                     .update(
//                       {
//                         remainingQuantity: model.sequelize.literal(
//                           `remainingQuantity + ${req.body.quantity}`
//                         ),
//                       },
//                       {
//                         where: {
//                           productId: id,
//                           supplierId: req.body.supplierId,
//                         },
//                       }
//                     )
//                     .then((update) => {
//                       console.log(id);
//                       res.status(200).json({
//                         message: "stock updated succcessfully!",
//                       });
//                     });
//                 } else {
//                   const createProductSupplier = model.productSuppliers.create({
//                     productId: existProduct.id,
//                     supplierId: req.body.supplierId,
//                     remainingQuantity: req.body.quantity,
//                   });

//                   return res.status(201).json({
//                     createProductSupplier: createProductSupplier,
//                   });
//                 }
//               });
//           })
//           .catch((err) => {
//             res.status(500).json({
//               message: err.message,
//               err,
//             });
//           });
//       } else {
//         model.sequelize.transaction(async (transaction) => {
//           // Create a new product
//           const newProduct = await model.products.create(product, {
//             transaction,
//           });

//           // Create a new productsupplier
//           const createProductSupplier = await model.productSuppliers.create(
//             {
//               productId: newProduct.id,
//               supplierId: req.body.supplierId,
//               remainingQuantity: newProduct.quantity,
//             },
//             { transaction }
//           );
//           return res.status(201).json({
//             newProduct,
//             createProductSupplier,
//           });
//         });

//         // model.products
//         //   .create(product)
//         //   .then((Result) => {
//         //     res.status(200).json({
//         //       message: "product added successfully",
//         //       result: product,
//         //     });
//         //   })
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message,
//         err,
//       });
//     });
// };


const addproduct = async (req, res) => {
  const product = {
    productName: req.body.productName,
    categoryId: req.body.categoryId,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    image: req.file ? req.file.path : null,
  };

  try {
    const existProduct = await model.products.findOne({
      where: { productName: req.body.productName },
    });

    if (existProduct) {
      const id = existProduct.id;
      const oldQuantity = existProduct.quantity;
      const updateQuantity = oldQuantity + req.body.quantity;

      await model.products.update(
        { quantity: updateQuantity },
        { where: { id } }
      );

      const [numUpdated] = await model.productSuppliers.update(
        {
          remainingQuantity: model.sequelize.literal(
            `remainingQuantity + ${req.body.quantity}`
          ),
        },
        {
          where: {
            productId: id,
            supplierId: req.body.supplierId,
          },
        }
      );

      if (numUpdated > 0) {
        res.status(200).json({
          message: "Stock updated successfully!",
        });
      } else {
        const createProductSupplier = await model.productSuppliers.create({
          productId: id,
          supplierId: req.body.supplierId,
          remainingQuantity: req.body.quantity,
        });

        res.status(201).json({
          message: "Stock updated successfully!",
          createProductSupplier,
        });
      }
    } else {
      await model.sequelize.transaction(async (transaction) => {
        const newProduct = await model.products.create(product, {
          transaction,
        });

        const createProductSupplier = await model.productSuppliers.create(
          {
            productId: newProduct.id,
            supplierId: req.body.supplierId,
            remainingQuantity: newProduct.quantity,
          },
          { transaction }
        );

        res.status(201).json({
          message: "Product and stock added successfully!",
          newProduct,
          createProductSupplier,
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  addproduct,
};

//read all product
const allproduct = (req, res) => {
  model.products
    .findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
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
        message: error.message,
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
          message: `product  deleted`,
        });
      } else {
        res.status(404).json({
          message: `product not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
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
              message: "product updated succcessfully!",
              update: editedproduct,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
              err,
            });
          });
      } else {
        res.status(401).json({
          message: "product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
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
};
