const model = require("../models");
const order = require("../models/order");

//[
//     {
//     productId:1,
//     price:300,
//     customerId:1,
//     quantity:10
// },
// {
//     productId:1,
//     price:300,
//     customerId:1,
//     quantity:10
// },
// {
//     productId:1,
//     price:300,
//     customerId:1,
//     quantity:10
// }

// ]

// const addOrder = async (req, res) => {
//   try {
//     await model.sequelize.transaction(async (transaction) => {
//       let customerId = req.body.customerId;
//       const orderNew = await model.order.create(
//         {
//           customerId,
//         },
//         {
//           transaction,
//         }
//       );

//       //       // Create an array to store productIds and quantities
//       // const productUpdates = [];

//       // // Populate the productUpdates array
//       // req.body.data.forEach((item) => {
//       //   productUpdates.push({
//       //     productId: item.productId,
//       //     quantity: item.quantity,
//       //   });
//       // });

//       // // Update product quantities
//       // for (const update of productUpdates) {
//       //   const { productId, quantity } = update;
//       //   const product = await model.products.findByPk(productId, { transaction });

//       //   if (product) {
//       //     // Calculate updated quantity
//       //     const updatedQuantity = Math.max(product.quantity - quantity, 0);

//       //     // Update the product's quantity in the database
//       //     await product.update({ quantity: updatedQuantity }, { transaction });
//       //   }
//       // }

//       // Populate the productUpdates array
//       req.body.data.forEach(async(item) => {
//         const { productId, quantity } = item;
//         const product = await model.products.findByPk(productId, {
//           transaction,
//         });

//         if (product) {
//           // Calculate updated quantity
//           const updatedQuantity = product.quantity - quantity;

//           // Update the product's quantity in the database
//           await product.update({ quantity: updatedQuantity }, { transaction });
//         }
//       });

//       await Promise.all(
//         req.body.data.map(async (item) => {
//           const newProdcutOrder = {
//             orderId: orderNew.id,
//             productId: item.productId,
//             quantity: item.quantity,
//             unitPrice: item.unitPrice,
//             total: item.unitPrice * item.quantity,
//           };

//           await model.productOrder.create(newProdcutOrder, { transaction });
//         })
//       );
//     });
//     return res.status(200).json({
//       message: "order created sucessfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//       err,
//     });
//   }
// };



const addOrder = async (req, res) => {
  try {
    await model.sequelize.transaction(async (transaction) => {
      let customerId = req.body.customerId;
      let orders = req.body.order;
      const orderNew = await model.order.create(
        {
          customerId,
        },
        {
          transaction,
        }
      );

      const outOfStockProducts = [];

      // Update product quantities
      for (const item of orders) {
        const product = await model.products.findByPk(item.productId, { transaction });

        if (!product || product.quantity < item.quantity) {
          outOfStockProducts.push( product.productName );
        } else {
                    // Calculate updated quantity
                    const updatedQuantity = product.quantity - item.quantity;
          
                    // Update the product's quantity in the database
                    await product.update({ quantity: updatedQuantity },{where:{id:product.id}}, { transaction });
          const newProdcutOrder = {
            orderId: orderNew.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.unitPrice * item.quantity,
          };

          await model.productOrder.create(newProdcutOrder, { transaction });
        }
      }

      if (outOfStockProducts.length > 0) {
        return res.status(200).json({
          message: 'Out of stock: ' + outOfStockProducts,
        });
      } else {
        return res.status(200).json({
          message: 'Order created successfully.',
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      err,
    });
  }
};

const showProductOrder = (req, res) => {
  model.productOrder
    .findAll({
      include: [
        {
          model: model.order,
          include: [
            {
              model: model.customer,
              attributes: ["name"],
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        },
        {
          model: model.products,
          attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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
  addOrder: addOrder,
  showProductOrder: showProductOrder,
};
