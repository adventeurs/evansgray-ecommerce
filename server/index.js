const express = require('express');
const routes = require('express').Router();
const app = express();
const env = require("dotenv").config();
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_KEY);

const confirmation = require('./routes/email');
const products = require('./routes/products');
const customer = require('./routes/customer');
const payment = require('./routes/payment');
const create = require('./routes/create');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, DELETE');
    if( 'OPTIONS' == req.method )
        res.sendStatus(200);
    else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });

app.post('/create', create );
app.post('/customer', customer );
app.post('/payment', payment );
app.post('/products', products );
app.post('/confirmation', confirmation );

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));