const mail = require('express').Router();
const confirmation = require('./confirmation');

mail.post('/confirmation', confirmation);

module.exports = mail;