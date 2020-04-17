const config = require('express').Router();
const stripe = require('./stripe');
const firebase = require('./firebase');

config.get('/stripe', stripe);
config.get('/firebase', firebase);

module.exports = config;