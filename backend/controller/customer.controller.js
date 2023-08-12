const model = require("../models")

//add customer 
const addCustomer = (req, res) => {
    const Customer = {
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
    };
    model.customer.create(Customer)
      .then((Result) => {
        res.status(200).json({
          message: "Customer added successfully",
          result: Customer,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:err.message,
          err,
        });
      });
  };
  //read all Customer
const allCustomer = (req, res) => {
  model.customer
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

//read Customer
const showCustomer = (req, res) => {
  model.customer
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"Customer not found"});
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete Customer
const deleteCustomer = (req, res) => {
  model.customer
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `Customer  deleted`,
        });
      } else {
        res.status(404).json({
          message: `Customer not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:err.message,
      });
    });
};

//update Customer
const updateCustomer = (req, res) => {
  model.customer
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedCustomer = {
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            phone:req.body.phone,

        };
        model.customer
          .update(editedCustomer, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              message: "Customer updated succcessfully!",
              update: editedCustomer,
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
          message: "Customer not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:err.message,
        err,
      });
    });
};


  module.exports={
    addCustomer,allCustomer,showCustomer,deleteCustomer,updateCustomer
  }