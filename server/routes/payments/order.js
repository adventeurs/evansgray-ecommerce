const stripe = require("./stripe");

module.exports = async (req, res) => {
  // Create stripe order
  let order = await stripe.orders.create({
    currency,
    items,
    email,
    shipping,
    customer,
    coupon
  });

  return order;
};
