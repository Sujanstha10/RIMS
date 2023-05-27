const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require("./models")
const admin = require("./route/admin.route")

const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/', admin)

module.exports = app;
