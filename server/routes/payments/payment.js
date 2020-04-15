const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = async ( req, res ) => {
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
};


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
};