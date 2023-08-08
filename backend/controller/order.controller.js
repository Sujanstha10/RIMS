const model = require("../models");

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

const addOrder = async (req, res) => {
  try {
    await model.sequelize.transaction(async (transaction) => {
      let customerId = req.body.customerId;
      const orderNew = await model.order.create(
        {
          customerId,
        },
        {
          transaction,
        }
      );
      await Promise.all(
        req.body.data.map(async (item) => {
          const newProdcutOrder = {
            orderId: orderNew.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
          await model.productOrder.create(newProdcutOrder, { transaction });
        })
      );
    });
    return res.status(200).json({
      message: "order created sucessfully",
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
        messege: error.message,
        error,
      });
    });
};

module.exports = {
  addOrder: addOrder,
  showProductOrder: showProductOrder,
};
