const model = require("../models");

const addStock = async(req, res) => {
  model.products
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      if(result){
         model.sequelize.transaction(async (transaction) => {
           let existingQuantity = +result.quantity;
     
           let newQuantity = existingQuantity + +req.body.quantity;
           model.products
             .update(
               { quantity: newQuantity },
               { where: { id: req.params.id }},{transaction} 
             )


             const createProductSupplier = await model.productSuppliers.create(
              {
                productId: result.id,
                supplierId: req.body.supplierId,
                remainingQuantity: req.body.quantity,
              },
              { transaction }
            );   
                 res.status(201).json({
              message: "stock added successfully!",
            });
        });
      }else{
        res.status(200).json({
          message: "product not found",
        });
      }
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
          attributes: ["productName"  ,
      ],
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
          through: { attributes: ["remainingQuantity"],as:"qunatity" }, // Include remainingQuantity from the junction table
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


// const fetchSimilarProductsAndCalculateTotal = async () => {
//   try {
//     const result = await model.productSupplier.findAll({
//       attributes: [
//         'productId', // Select productId
//         [model.sequelize.fn('SUM', model.sequelize.col('remainingQuantity')), 'total'] // Calculate the sum of quantity and alias it as 'totalQuantity'
//       ],
//       group: ['productId'], // Group by productId
//       raw: true // Get raw result rows
//     });

//     console.log(result);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// };



module.exports = {
  addStock,
  showProductSupplier,
  showProductSupplierById,
  // fetchSimilarProductsAndCalculateTotal
};
