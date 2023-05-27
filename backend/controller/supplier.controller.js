const model = require("../models")

//add supplier 
const addsupplier = (req, res) => {
    const supplier = {
        supplierName:req.body.supplierName,
    };
    model.supplier.create(supplier)
      .then((Result) => {
        res.status(200).json({
          message: "supplier added successfully",
          result: supplier,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          err,
        });
      });
  };
  //read all supplier
const allsupplier = (req, res) => {
  model.supplier
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

//read supplier
const showsupplier = (req, res) => {
  model.supplier
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"supplier not found"});
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
        error,
      });
    });
};

//delete supplier
const deletesupplier = (req, res) => {
  model.supplier
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          messege: `supplier  deleted`,
        });
      } else {
        res.status(404).json({
          messege: `supplier not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        messege: "Something went wrong",
      });
    });
};

//update supplier
const updatesupplier = (req, res) => {
  model.supplier
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedsupplier = {
          supplierName:req.body.supplierName,

        };
        model.supplier
          .update(editedsupplier, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              messege: "supplier updated succcessfully!",
              update: editedsupplier,
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
          messege: "supplier not found",
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
    addsupplier,allsupplier,showsupplier,deletesupplier,updatesupplier
  }