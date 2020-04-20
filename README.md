# Evansgray
  
### Viewing project
This project is live at <http://www.evansgray.herokuapp.com>

  - Create an account with the login button in the upper right. 
  - On the landing page select shop, or scroll down to select a category. 
  - Select an item from the shop. Use the checkboxes to filter search results.
  - On the product page add the available quanity to your cart.
  - Select the cart button in the upper right to checkout.
  - Enter fake shipping info and proceed to payment.
  - Enter 4242 repeating for the card information.
  - Pay

Evansgray is an e-commerce app built in Angular and implements the following :
  - Node.js in Express
  - Cloud Firestore 
  - Firebase SDK
  - Firebase Cloud Functions
  - Sendgrid API
  - Stripe Payment API
  - Sass
  - Angular Material
  - Typescript
  - NPM: nodemon, angularfire, concurrently, dotenv, express, rxjs



# Breakdown

### Authentication Service
Users are authenticated and managed in Firebase. A user has the option of logging in or signing up                             through email and password or google provider. Firebase Auth persists user authentication locally and the user is provided     the option to log themselves out. On registry user data is created in Firestore and is accessible throughout the               application as a RxJS subject.   
  
  Firestore Data Structure
  ```js 
 - users/uid
         -- info
         -- stripe cutomer id
         -- order history
```

Create Stripe Customer
```js
// send required info to server and retrieve a stripeId, then store it with customer info.
  app.post('/customer', async ( req, res ) => {
      const { name, email } = req.body

  try{
     let customer = await stripe.customers.create(
          {
              name: name,
              email: email
          }
      )
      let stripeId = {
          id: customer.id
      }
         res.send(stripeId)

      } catch(e){
          res.send({ error: e.message })
      }

  })


```

### Product Service
Products are retrieved from firestore and then sorted in the shop view. All products are located in the product collection in firestore. Products are displayed inside a cdk-virutal-scroll-viewport and rendered on scroll. The search feature is implemented through checkboxes. A user checks a search term which is then set as a query param, the products displayed are then filtered by this search term. Every product contains a 'searchable' array which contains its relevant search descriptors. 

Firestore Data Structure
```js
- product/title
        -- product 
               -- info
               // array of search terms used to filter queries or results
               -- searchable : [ search terms ]
```

### Cart Service
A users shopping cart is assigned as a document in the carts collection under thier userId. A document reference is stored as a RxJS subject and updated as the user add, removes or changes quantity of the products in their cart. When the user checks out the cart is deleted and their order data is added to the order history in thier account.

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
// deconstruct the body of our request 🦄
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
