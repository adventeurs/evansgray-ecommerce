const mail = require('express').Router();
const confirmation = require('./confirmation');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mail.post('/email/confirmation', confirmation);

module.exports = mail;