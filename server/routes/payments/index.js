const payment = require('express').Router();
const pay = require('./payment');

payment.post('/', pay);

module.exports = payment;