// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripe = require("./stripe");

module.exports = async (req, res) => {
  const {
    paymentMethodId,
    currency,
    items,
    shipping,
    customer,
    email,
    coupon
  } = req.body;

  try {
    // Create stripe order
    let order = await stripe.orders.create({
      currency,
      items,
      email,
      shipping,
      customer,
      coupon
    });

    let paymentIntent;
    if (paymentMethodId) {
      // create stripe payment intent object
      paymentIntent = await stripe.paymentIntents.create({
        amount: order.amount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        customer: customer,
        shipping: shipping,
        confirm: true,
        coupon
      });
    }
    res.send({ intent: generateResponse(paymentIntent), order: order });
  } catch (e) {
    res.send(e);
  }
};

const generateResponse = intent => {
  switch (intent.status) {
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
