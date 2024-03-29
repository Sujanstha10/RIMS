const model = require("../models")

//add supplier 
const addsupplier = (req, res) => {
    const supplier = {
        supplierName:req.body.supplierName,
        contactPerson:req.body.contactPerson,
        contacNumber:req.body.contacNumber,
    };
    model.suppliers.create(supplier)
      .then((Result) => {
        res.status(200).json({
          message: "supplier added successfully",
          result: supplier,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          err,
        });
      });
  };
  //read all supplier
const allsupplier = (req, res) => {
  model.suppliers
    .findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message:error.message,
        error,
      });
    });
};

//read supplier
const showsupplier = (req, res) => {
  model.suppliers
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"supplier not found"});
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete supplier
const deletesupplier = (req, res) => {
  model.suppliers
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `supplier  deleted`,
        });
      } else {
        res.status(404).json({
          message: `supplier not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//update supplier
const updatesupplier = (req, res) => {
  model.suppliers
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedsupplier = {
            supplierName:req.body.supplierName,
            contactPerson:req.body.contactPerson,
            contacNumber:req.body.contacNumber,
        };
        model.suppliers
          .update(editedsupplier, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              message: "supplier updated succcessfully!",
              update: editedsupplier,
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
          message: "supplier not found",
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


  module.exports={
    addsupplier,allsupplier,showsupplier,deletesupplier,updatesupplier
  }