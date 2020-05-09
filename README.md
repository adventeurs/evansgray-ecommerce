# Evansgray
  
### Viewing project
MVP is live at <https://evansgray.herokuapp.com/>

  - Create an account with the login button in the upper right. 
  - On the landing page select shop, or scroll down to select a category. 
  - Select an item from the shop. Use the checkboxes to filter search results.
  - On the product page add the available quanity to your cart.
  - Select the cart button in the upper right to checkout.
  - Enter fake shipping info and proceed to payment.
  - Enter 4242 repeating for the card information.
  - Pay

<<<<<<< HEAD
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.
=======
Evansgray is an e-commerce app built in Angular and implements the following :
  - Node.js in Express
  - Cloud Firestore 
  - Firebase SDK
  - Firebase Cloud Functions
  - Sendgrid API
  - Stripe Payment API
  - Scss
  - Angular Material
  - Typescript
  - NPM: nodemon, angularfire, concurrently, dotenv, express, rxjs
>>>>>>> 6e1298934864f33c2fc87826190d37f48d8ba598

## Development server

<<<<<<< HEAD
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
=======

# Breakdown
>>>>>>> 6e1298934864f33c2fc87826190d37f48d8ba598

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

<<<<<<< HEAD
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
=======

```
>>>>>>> 6e1298934864f33c2fc87826190d37f48d8ba598

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

<<<<<<< HEAD
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=======
Firestore Data Structure
```js
- carts/uid 
       // One sku per item added. If a customer adds multiple products, multiple skus will be added.
       -- sku : { product info }
```

### Stripe Integration 
To integrate with Stripe multiple api calls are required. A stripe customer must be created in order to store order history, shipping information and card details (optionally). The stripe customer id is then required to create a Stripe order, when an order is created Stripe returns an order total based on the skus provided within the order. This means every product in the Firestore database is accompanied with a Stripe product. A Stripe product must first be created, a product id is returned which is then used to create a sku with a price model. Finally, a stripe card is mounted on checkout and a payment intent is passed to the server and processed with Stripe.

Server
```js
// destructure the body of our request 🦄
  const { paymentMethodId, // stripe paymentMethodId created by stripe elements
              currency,     // usd
              items,        // array of products in order
              shipping,     // shipping info formated according to stripe API
              customer,     // stripeCustomerId we created earlier
              email         // email associated with user and/or stripe customer
                      } = req.body
            
// an order must be created to identify a customer order relationship
    let order = await stripe.orders.create({
                            currency,
                            items,
                            email,
                            shipping,
                            customer
                        })
                        
// with the order amount we can compare the total calculated by stripe with the total on our end. 
// then take the order total and submit it with payment.
    ...
    paymentIntent = await stripe.paymentIntents.create({
                    // create stripe payment intent object
                    amount: order.amount,
                    currency: currency,
                    payment_method: paymentMethodId,
                    confirmation_method: 'manual',
                    customer: customer,
                    shipping: shipping,
                    confirm: true
                })
     ...  
// retreive client secret, send back to front end with order and store order success 
       
```

### Sendgrid Integration
Sendgrid is set up through Firebase cloud functions. When a particular document is created, Firebase with retrieve the document and insert the required data into our email template. Sendgrid then sends the email for us.

```js
// Send welcome email to new customers
// deploy function to cloud 
exports.newCustomer = functions.auth.user().onCreate( user => {

    const msg = {
        to: user.email,
        from: 'you@email.com',
        templateId: 'sendgridTemplateId',
        dynamic_template_data: {
            name: user.displayName
        }
    };

    return sgMail.send(msg);
});

```

### User Accounts & Management
Every user has a basic dashboard to review order history, update information or delete their account.
>>>>>>> 6e1298934864f33c2fc87826190d37f48d8ba598
