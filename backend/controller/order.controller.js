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

const addOrder = (async(req, res) => {
  try{
   await model.sequelize.transaction(async (transaction) => {

      console.log(req.body);
  
  
      let customerId = req.body.customerId
     
      const orderNew = await model.order.create(
          {
            customerId,
          },
          {
            transaction,
          }
        )

      await Promise.all(
         req.body.data.map(async(item) => {
  
          const newProdcutOrder = {
            orderId: orderNew.id,
            productId: item.productId,
            quantity:item.quantity,
            unitPrice:item.unitPrice
          }
         await model.productOrder.create(newProdcutOrder,{transaction});
        })
      );
    });

    return res.status(200).json({
      message: "order created sucessfully",
    });

  }catch(err){
    res.status(500).json({
      message: err.message,
      err,
    });
  }
});


module.exports={
  addOrder:addOrder
}