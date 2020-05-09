
const calculateOrderTotal = ( order ) => {
    let total = 0;

    for( let i = 0; i < order.length; i++ ) 
        total += order[i].price;

    return total;
};

app.post('/payment', async ( req, res ) => {
    const { paymentMethodId, 
            items, 
            currency,
            customer, 
            shipping }       = req.body
    // const orderTotal = calculateOrderTotal(items);

    try{
        let paymentIntent;
        if( paymentMethodId ){
            paymentIntent = await stripe.paymentIntents.create({
                // create stripe payment intent object
                amount: 500,
                currency: currency,
                payment_method: paymentMethodId,
                confirmation_method: 'manual',
                // includes shipping.address & shipping.name
                // shipping: req.shipping,
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