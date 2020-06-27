const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const { code } = req.body;
  try {
    let discount = awaitstripe.coupons.retrieve(code);
    res.send(discount);
  } catch (err) {
    res.send(err);
  }
};
