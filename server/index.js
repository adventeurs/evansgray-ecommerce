const express = require('express');
const app = express();
const env = require("dotenv").config();
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_KEY);
// const db = admin.firestore();
// const sgMail = require('@sendgrid/mail');
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// console.log(msg)
// sgMail.send(msg);

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


app.get('/', function (req, res) {
    console.log('hello')
  });


const calculateOrderTotal = ( order ) => {
    let total = 0;

    for( let i = 0; i < order.length; i++ ) 
        total += order[i].price;

    return total;
};


app.post('/customer', async ( req, res ) => {
    const { name, email } = req.body

   let customer = await stripe.customers.create(
        {
            name: name,
            email: email
        }
    )
    let stripeId = {
        id: customer.id
    }
       res.send(stripeId)
    
})

app.post('/payment', async ( req, res ) => {
    const { paymentMethodId, 
            currency,
            items,
            shipping,
            customer,
            stripeCustomerId } = req.body
    // const orderTotal = calculateOrderTotal(items);
    let order = await stripe.orders.create({
        currency: currency,
        items: items,
        email: customer,
        items: [{ type: 'sku', parent: 'RHAG52' }],
        shipping: shipping,
        customer: stripeCustomerId
    })


    try{
        let paymentIntent;
        if( paymentMethodId ){
            paymentIntent = await stripe.paymentIntents.create({
                // create stripe payment intent object
                amount: 500,
                currency: currency,
                payment_method: paymentMethodId,
                confirmation_method: 'manual',
                customer: 'cus_Go7RwMHsX1sqgh',
                // includes shipping.address & shipping.name
                shipping: shipping,
                confirm: true
            })

        }
        res.send(generateResponse(paymentIntent));
    } catch ( e ){
        res.send({ error: e.message })
    }
})


const generateResponse = ( intent ) => {
    switch ( intent.status ) {
        case "requires_action":
        case "requires_source_action":
            return {
                requiresAction: true,
                paymentIntentId: intent.id,
                clientSecret: intent.client_secret
            };
        case "requires_payment_method":
        case "requires_source":
            return {
                error: "Your card was denied"
            };
        case "succeeded":
            return {
                clientSecret: intent.client_secret
            };
    }
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));