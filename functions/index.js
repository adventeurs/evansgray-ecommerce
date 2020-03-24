const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');

const stripe = require('stripe')(process.env.STRIPE_KEY);

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

exports.newCustomer = functions.auth.user().onCreate( user => {

    const msg = {
        to: user.email,
        from: 'emily@shopevansgray.com',
        templateId: 'd-d2bd9dc51a2c4b3db25f99d9f5d4daf8',
        dynamic_template_data: {
            name: user.displayName
        }
    };

    return sgMail.send(msg);
});

