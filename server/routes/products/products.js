const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = async ( req, res ) => {

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
}