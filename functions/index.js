const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const sgMail = require("@sendgrid/mail");

const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

// exports.abandonedCart = functions.firestore
//   .document("/users/{uid}")
//   .onUpdate((change, context) => {
//     console.log("it's working");
//     console.log(change.before.data());
//     try {
//       const { displayName, email } = change.before.data();

//       db.doc(`/carts/${context.params.uid}`)
//         .get()
//         .then(data => {
//           const msg = {
//             to: email,
//             from: "emily@shopevansgray.com",
//             templateId: "d-d2bd9dc51a2c4b3db25f99d9f5d4daf8",
//             dynamic_template_data: {
//               name: displayName
//             }
//           };

//           sgMail.send(msg);
//         });

//       return "okay";
//     } catch (e) {
//       return e;
//     }
//   });

exports.abandonedCart = functions.auth.user().onCreate(user => {
  const msg = {
    to: user.email,
    from: "emily@shopevansgray.com",
    templateId: "d-788882243f934cc9809f1614c42faba6",
    dynamic_template_data: {
      name: user.displayName
    }
  };

  return sgMail.send(msg);
});
