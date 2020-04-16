const routes = require('express').Router();
const email = require('./email');
const payment = require('./payments');
const customer = require('./customer');
const product = require('./products');
const config = require('./config');

routes.use('/email', email);
routes.use('/payment', payment);
routes.use('/customer', customer);
routes.use('/product', product);
routes.use('/config', config);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });

module.exports = routes