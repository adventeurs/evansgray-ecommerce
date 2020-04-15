const routes = require('express').Router();
const email = require('./email')
const payment = require('./payments');

routes.use('/email', email)
routes.use('/payment', payment)

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });

module.exports = routes