# Evansgray

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


# Usage

Authentication Service [src > app > services > auth]\
	Users are authenticated and managed in Firebase. A user has the option of logging in or signing up                             through email and password or google provider. Firebase Auth persists user authentication locally and the user is provided     the option to log themselves out. On registry user data is created in Firestore and is accessible throughout the               application as a RxJS subject.   
    
  Firestore \
        		- users/uid\
                		-- info\
                		-- order history

Product Service [ src > app > services > product ]\ 
Products are retrieved from firestore and then sorted in the shop view. All products are located in the product collection in firestore. Products are displayed inside a cdk-virutal-scroll-viewport and rendered on scroll. The search feature is implemented through checkboxes. A user checks a search term which is then set as a query param, the products displayed are then filtered by this search term. Every product contains a 'searchable' array which contains its relevant search descriptors. 

  Firestore \
       - product/title\
                 -- product info

Cart Service [ src > app > services > cart ]\
A users shopping cart is assigned as a document in the carts collection under thier userId. A document reference is stored as a RxJS subject and updated as the user add, removes or changes quantity of the products in their cart. When the user checks out the cart is deleted and their order data is added to the order history in thier account.
  Firestore\
        - carts/uid \
                 --+ sku { product info }\

Stripe Integration 
To integrate with Stripe multiple api calls are required. A stripe customer must be created in order to store order history, shipping information and card details (optionally). The stripe customer id is then required to create a Stripe order, when an order is created Stripe returns an order total based on the skus provided within the order. This means every product in the Firestore database is accompanied with a Stripe product. A Stripe product must first be created, a product id is returned which is then used to create a sku with a price model. Finally, a stripe card is mounted on checkout and a payment intent is passed to the server and processed with Stripe.

Sendgrid Integration :
Sendgrid is set up through Firebase cloud functions. When a particular document is created, Firebase with retrieve the document and insert the required data into our email template. Sendgrid then sends the email for us.

User Accounts & Management :
Every user has a basic dashboard to review order history, update information or delete their account.
