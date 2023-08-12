const model = require("../models")

//add category 
const addcategory = (req, res) => {
    const category = {
        categoryName:req.body.categoryName,
    };
    model.category.create(category)
      .then((Result) => {
        res.status(200).json({
          message: "category added successfully",
          result: category,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: error.message,
          err,
        });
      });
  };
  //read all category
const allcategory = (req, res) => {
  model.category
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

//read category
const showcategory = (req, res) => {
  model.category
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
        if(result)
      res.status(200).json(result);
      else
      res.status(401).json({message:"category not found"});
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete category
const deletecategory = (req, res) => {
  model.category
    .destroy({ where: { id:req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `category  deleted`,
        });
      } else {
        res.status(404).json({
          message: `category not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: error.message,
      });
    });
};

//update category
const updatecategory = (req, res) => {
  model.category
    .findOne({ where: { id: req.params.id } })
    .then((exist) => {
      if (exist) {
        const editedcategory = {
          categoryName:req.body.categoryName,

        };
        model.category
          .update(editedcategory, { where: { id: req.params.id } })
          .then((update) => {
            res.status(200).json({
              message: "category updated succcessfully!",
              update: editedcategory,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: error.message,
              err,
            });
          });
      } else {
        res.status(401).json({
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: error.message,
        err,
      });
    });
};


  module.exports={
    addcategory,allcategory,showcategory,deletecategory,updatecategory
  }