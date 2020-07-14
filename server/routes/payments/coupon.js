const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const code = req.body;
  try {
    let discount = await stripe.coupons.retrieve(code);
    res.send({ discount: discount });
  } catch (err) {
    res.send(err);
  }
};
