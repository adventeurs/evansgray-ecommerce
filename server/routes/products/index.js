const products = require('express').Router();
const product = require('./products');

products.post('/', product)

module.exports = products;