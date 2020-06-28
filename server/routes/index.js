const routes = require("express").Router();
const email = require("./email");
const payment = require("./payments");
const customer = require("./customer");
const product = require("./products");

routes.use("/email", email);
routes.use("/payment", payment);
routes.use("/customer", customer);
routes.use("/product", product);

module.exports = routes;
