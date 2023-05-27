const model = require("../models")

//add product 
const addproduct = (req, res) => {
    const product = {
        productName:req.body.productName,
    };
    model.product.create(product)
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
  };
  //read all product
const allproduct = (req, res) => {
  model.product
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
  model.product
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"product not found"});
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
  model.product
    .destroy({ where: { id:req.params.id } })
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
        messege: "Something went wrong",
      });
    });
};

//update product
const updateproduct = (req, res) => {
  model.product
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedproduct = {
          productName:req.body.productName,

        };
        model.product
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


  module.exports={
    addproduct,allproduct,showproduct,deleteproduct,updateproduct
  }