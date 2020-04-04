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

Authentication Service [ src > app > services > auth ] : 
    Users are authenticated and managed in Firebase. A user has the option of logging in or signing up                             through email and password or google provider. Firebase Auth persists user authentication locally and the user is provided     the option to log themselves out. On registry user data is created in Firestore and is accessible throughout the               application as a RxJS subject.   
    
  Firestore 
        - users/uid
                -- info
                -- order history

Product Service [ src > app > services > product ] : 

  Firestore 
       - product/title
                 -- product info

Cart Service [ src > app > services > cart ] :
  Firestore
        - carts/uid 
                 -- sku {
                        price
                        quantity
                        }

Stripe Integration :

Sendgrid Integration :

User Accounts & Management :

