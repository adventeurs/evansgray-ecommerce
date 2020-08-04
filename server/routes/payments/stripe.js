// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripe = require("stripe")("sk_test_c1ZeCh1UyaMRu5qszLPgV0sG00Fx1s9uN2");

module.exports = stripe;
