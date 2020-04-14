const express = require('express');
const app = express();
const env = require("dotenv").config();
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_KEY);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
try{
    sgMail.send(msg);
}catch(e){
    console.log(e)
}

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

app.post('/discount', async( req, res ) => {
    
})

app.post('/create', async ( req, res ) => {
    let product = req.body

    try{
        let stripeProduct = await stripe.products.create(
            {
                active: true,
                name: product.title,
                type: "good",
                shippable: true,
                metadata: {
                    tax_code: 454110 
                }
            }
        )
        
        await stripe.skus.create(
            {
                id: product.sku,
                price: product.price,
                currency: 'usd',
                inventory: { type: 'infinite' },
                product: stripeProduct.id
            }
        )

        res.send('product created')
    } catch( err ){
        res.send( err )
    }
})


app.post('/customer', async ( req, res ) => {
    const { name, email } = req.body

try{
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
       
    } catch(e){
        res.send({ error: e.message })
    }
    
})


app.post('/payment', async ( req, res ) => {
    const { paymentMethodId, 
            currency,
            items,
            shipping,
            customer,
            email  } = req.body

    try{
        let order = await stripe.orders.create({
                            currency,
                            items,
                            email,
                            shipping,
                            customer
                        })


    
        let paymentIntent;
        if( paymentMethodId ){
            paymentIntent = await stripe.paymentIntents.create({
                // create stripe payment intent object
                amount: order.amount,
                currency: currency,
                payment_method: paymentMethodId,
                confirmation_method: 'manual',
                customer: customer,
                shipping: shipping,
                confirm: true
            })

        }
        res.send({ intent: generateResponse(paymentIntent),
                   order: order
                });
    } catch ( e ){
        res.send( e )
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

app.post('/products', async ( req, res ) => {

    try{
        let stripeProduct = await stripe.products.create(
            {
                active: true,
                name: req.body.title,
                type: "good",
                shippable: true
            }
        )

        await stripe.skus.create(
            {
                id: req.body.sku,
                price: req.body.price,
                currency: 'usd',
                inventory: { type: 'infinite' },
                product: stripeProduct.id
            }
        )

        res.send('product created')
    } catch( err ){
        console.error(err)
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));