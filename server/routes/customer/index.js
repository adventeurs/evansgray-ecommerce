const user = require('express').Router();
const customer = require('./customer');

user.post('/', customer);

module.exports = user;