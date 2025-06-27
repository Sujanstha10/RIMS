const model = require("../models");
const order = require("../models/order");
const productorder = require("../models/productorder");
const products = require("../models/products");


const addOrder = async (req, res) => {
  try {
    await model.sequelize.transaction(async (transaction) => {
      let customerId = req.params.customerId;
      const cusotmer = await model.customer.findOne({ where: { id: customerId }, attributes: ["name", "phone", "address"] })
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
      const remainingStockProducts = [];
      // Create an array to store productIds and quantities
      const productUpdates = [];

      const filteredOrder = orders.filter((item) => item.quantity !== 0);
      // console.log(filteredOrder);

      // Populate the productUpdates array
      filteredOrder.forEach((item) => {
        productUpdates.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.unitPrice * item.quantity,
        });
        // console.log(item)
      });

      // console.log(productUpdates[0].total)
      let totalAmt = 0;
      productUpdates.forEach((item) => {
        totalAmt += item.total;
      });
      // console.log(totalAmt)


      // Update product quantities
      await Promise.all(
        productUpdates.map(async (item) => {
          const product = await model.products.findByPk(item.productId, {
            transaction,
          });
          if (!product || product.quantity < item.quantity) {
            outOfStockProducts.push(product.productName);
            remainingStockProducts.push(product.quantity);
          } else {
            // Calculate updated quantity
            const updatedQuantity = Math.max(
              product.quantity - item.quantity,
              0
            );
            // Update the product's quantity in the database
            await product.update(
              { quantity: updatedQuantity },
              { where: { id: product.id } },
              { transaction }
            );
            const newProdcutOrder = {
              orderId: orderNew.id,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.unitPrice * item.quantity,
            };

            await model.productOrder.create(newProdcutOrder, { transaction })
          }
        })
      );
      const message = [];

      // const totalAmt=         productUpdates.forEach((item)=>{
      //   let amt = 0;
      //   console.log(amt = amt + item.total)

      // })


      if (outOfStockProducts.length > 0) {
        outOfStockProducts.forEach((item, i) => {
          message.push(
            `Out of stock: ${item}, only ${remainingStockProducts[i]} left`
          );
          //  const message = "Out of stock: " + item
        });
        return res.status(200).json({
          message,
          // message: "remaining stock" + outOfStockProducts.stock
        });
      } else if (filteredOrder.length == 0) {
        return res.status(200).json({
          message: "No Order placed .",
        });
      } else {
        return res.status(200).json({

          // cusotmer: cusotmer,
          // orderPlaced: filteredOrder,

          cusotmer: cusotmer,
          orderPlaced: productUpdates,
          message: "Order placed successfully.",
          totalAmt: totalAmt
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


const showProductOrder = async (req, res) => {
  // model.productOrder.findAll({
  //   attributes:["quantity",'unitPrice','total','createdAt'],
  //   include:[{
  //             model:model.products,
  //             attributes:["productName"],

  //           },
  //           {model:model.order,
  //             attributes:["id"],
  //             include:[{
  //               model:model.customer,
  //               as:"customer",
  //               attributes:["name"],

  //             }]
  //           }],
  // })

  // model.order
  //   .findAll({
  //     attributes: [],
  //     include: [
  //       { model: model.customer, as: "customer", attributes: ["name"] },
  //       {
  //         model: model.productOrder,
  //         attributes:["quantity","unitPrice","total"],
  //         include:[{
  //           model:model.products,
  //           attributes:["productName"]
  //         }]
  //       },
  //     ],
  //   })
  try {



    const orders = await model.order.findAll({
      attributes: [],
      include: [
        {
          model: model.customer,
          as: "customer",
          attributes: ["name"],
        },
        {
          model: model.productOrder,
          attributes: ["quantity", "unitPrice", "total"],
          include: [
            {
              model: model.products,
              attributes: ["productName"],
            },
          ],
        },
      ],
    });

    // Now, calculate the grand total for each order
    const ordersWithGrandTotal = orders.map((order) => {
      const grandTotal = order.productOrders.reduce(
        (total, productOrder) => total + productOrder.total,
        0
      );

      return {
        ...order.toJSON(),
        grandTotal,
      };
    });

    console.log(ordersWithGrandTotal);
    return res.status(200).json({
      ordersWithGrandTotal,
    });

    // .then((result) => {
    //   res.status(200).json({
    //     result,
    //   });
    // })
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      error,
    });
  };
};




const showProductOrderById = (req, res) => {
  model.customer
    .findOne({
      where: { id: req.params.id },
      attributes: ["name"],
      include: [{
        model: model.order,
        attributes: ["id"],
        include: [{
          model: model.products,
          attributes: ["productName"],
        }]
      }],

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
      })
    })
}




module.exports = {
  addOrder: addOrder,
  showProductOrder: showProductOrder,
  showProductOrderById
}
