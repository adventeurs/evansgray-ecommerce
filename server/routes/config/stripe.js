module.exports = (req, res) => {

    res.send({
        stripeKey: process.env.STRIPE_TEST_KEY
    })
}