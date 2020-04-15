module.exports =  async ( req, res ) => {
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
}