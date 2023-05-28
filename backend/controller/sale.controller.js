const model = require("../models")

//add sale 
const addsale = (req, res) => {
    const sale = {
        productId:req.body.productId,
        quantity:req.body.quantity,
        unitPrice:req.body.unitPrice,
        saleDate:req.body.saleDate,
    };
    model.sales.create(sale)
      .then((Result) => {
        res.status(200).json({
          message: "sale added successfully",
          result: sale,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err,
        });
      });
  };
  //read all sale
const allsale = (req, res) => {
  model.sales
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

//read sale
const showsale = (req, res) => {
  model.sales
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"sale not found"});
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//delete sale
const deletesale = (req, res) => {
  model.sales
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `sale  deleted`,
        });
      } else {
        res.status(404).json({
          messege: `sale not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
      });
    });
};

//update sale
const updatesale = (req, res) => {
  model.sales
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedsale = {
            productId:req.body.productId,
            quantity:req.body.quantity,
            unitPrice:req.body.unitPrice,
            saleDate:req.body.saleDate,

        };
        model.sales
          .update(editedsale, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "sale updated succcessfully!",
              update: editedsale,
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
          messege: "sale not found",
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


  module.exports={
    addsale,allsale,showsale,deletesale,updatesale
  }