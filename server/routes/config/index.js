const config = require('express').Router();
const stripe = require('./stripe');
const firebase = require('./firebase');

app.get('/stripe', stripe);
app.get('/firebase', firebase);

module.exports = config;