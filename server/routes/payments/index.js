const payment = require("express").Router();
const pay = require("./payment");
const discount = require("./coupon");

payment.post("/", pay);
payment.get("/discount", discount);

module.exports = payment;
