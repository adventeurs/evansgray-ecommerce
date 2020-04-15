const mail = require('express').Router();
const confirmation = require('./confirmation');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mail.post('/confirmation', confirmation);

module.exports = mail;