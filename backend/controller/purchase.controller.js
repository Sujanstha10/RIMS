const model = require("../models")

//add purchase 
const addpurchase = (req, res) => {
    const purchase = {
        purchaseName:req.body.purchaseName,
    };
    model.purchase.create(purchase)
      .then((Result) => {
        res.status(200).json({
          message: "purchase added successfully",
          result: purchase,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err,
        });
      });
  };
  //read all purchase
const allpurchase = (req, res) => {
  model.purchase
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

//read purchase
const showpurchase = (req, res) => {
  model.purchase
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"purchase not found"});
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//delete purchase
const deletepurchase = (req, res) => {
  model.purchase
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `purchase  deleted`,
        });
      } else {
        res.status(404).json({
          messege: `purchase not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
      });
    });
};

//update purchase
const updatepurchase = (req, res) => {
  model.purchase
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedpurchase = {
          purchaseName:req.body.purchaseName,

        };
        model.purchase
          .update(editedpurchase, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "purchase updated succcessfully!",
              update: editedpurchase,
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
          messege: "purchase not found",
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
    addpurchase,allpurchase,showpurchase,deletepurchase,updatepurchase
  }