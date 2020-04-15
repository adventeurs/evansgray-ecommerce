const products = require('express').Router();
const products = require('./products');

products.post('/', products)

module.exports = products;