const model = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");



dotenv.config();



//user login
const login = ((req, res) => {
  model.admin.findOne({ where: { email: req.body.email } }).then((user) => {
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
        }
        else{
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
      messege: "Something went wrong!!",
      error,
    });
  });
});


//update profile
const profile = ((req, res) => {
  let userId = req.userData.id;

  model.admin.findOne({ where: { id: userId }, attributes:["id","name","email"]}).then((result) => {
    if (result) {
      return res.status(200).json({
        data: result,
      });
    } else {
      res.status(401).json({
        message: "No user found",
      });
    }
  })  .catch((error) => {
    res.status(500).json({
      messege: "Something went wrong!!",
      error,
    });
  });;
});
  

  module.exports= {
    login,profile
  }