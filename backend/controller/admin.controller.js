const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const count = require('../helpers/count');
const customer = require("../models/customer");

dotenv.config();

//user login
const login = (req, res) => {
  model.admin
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const verify = jwt.sign(
              {
                name: user.name,
                id: user.id,
                email: user.email,
              },
              process.env.VERIFY_SEC,
              { expiresIn: "7d" },

              (err, token) => {
                res.status(200).json({
                  message: "Login succcessful!",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Invalid Credintals!",
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Invalid Credintals!",
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

//update profile
const profile = (req, res) => {
  let userId = req.userData.id;

  model.admin
    .findOne({ where: { id: userId }, attributes: ["id", "name", "email"] })
    .then((result) => {
      if (result) {
        return res.status(200).json({
          data: result,
        });
      } else {
        res.status(401).json({
          message: "No user found",
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





const allcount = async (req, res) => {
  try {
    // Call the count function for each model you want to count
    const customerPercentage = await count(model, 'customer');
    const orderPercentage = await count(model, 'order');
    const productsPercentage = await count(model, 'products');
    const supplierPercentage = await count(model, 'suppliers');

    // Send the response after all counts are computed
    res.status(200).json({
        customerPercentage,
        orderPercentage,
        productsPercentage,
        supplierPercentage,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};



module.exports = {
  login,  
  profile,
  allcount,
};
