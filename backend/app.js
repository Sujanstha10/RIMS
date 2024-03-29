const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const admin = require("./route/admin.route");
const category = require("./route/category.route");
const product = require("./route/product.route");
const purchase = require("./route/purchase.route");
const sale = require("./route/sale.route");
const supplier = require("./route/supplier.route");
const customer = require("./route/cusotmer.route");
const productSupplier = require("./route/productSupplier.route");
const order = require("./route/order.route");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", admin);
app.use("/category", category);
app.use("/product", product);
app.use("/purchase", purchase);
app.use("/sale", sale);
app.use("/supplier", supplier);
app.use("/customer", customer);
app.use("/stock",productSupplier );
app.use("/order",order);
app.use("/count",admin)
app.use("/uploads", express.static(__dirname + "/uploads"));

// sequelize.sync({force:true}).then((result)=>{
//   console.log("migration successful")
// }).catch(err=>{
//   console.log(err );
// })

module.exports = app;
