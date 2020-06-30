const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const ham = req.body;
  res.send(ham);
  //   const { name, email } = req.body;

  //   try {
  //     let customer = await stripe.customers.create({
  //       name: name,
  //       email: email
  //     });

  //     let stripeId = {
  //       id: customer.id
  //     };
  //     res.send(stripeId);
  //   } catch (e) {
  //     res.send({ error: e.message });
  //   }
};
