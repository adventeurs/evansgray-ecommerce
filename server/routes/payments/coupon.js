const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const { code } = req;

  stripe.coupons.retrieve(code, (err, coupon) => {
    if (err) res.send(err);
    if (coupon) res.send(coupon);
  });
};
