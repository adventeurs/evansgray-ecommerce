const payment = require("express").Router();
const pay = require("./payment");
const discount = require("./coupon");
const order = require("./order");

payment.post("/", pay);
payment.post("/discount", discount);
payment.post("/order", order);

module.exports = payment;
