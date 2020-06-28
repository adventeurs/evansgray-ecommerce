// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
// );
// const axios = require("axios");

// const url = "https://api.sendgrid.com/v3/contactdb/lists";
// try {
//   axios.get(url).then(resp => {
//     console.log(resp);
//   });
// } catch (e) {
//   console.log(e);
// }
// const http = require('https');

// const options = {
//     "method" : "",
//     "hostname": "api.sendgrid.com",
//     "port": null,
//     "path": "",
//     "headers": {
//         "authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
//     }
// }
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  let { email } = req.body;

  try {
    const msg = {
      to: "emily@shopevansgray.com",
      from: "emily@shopevansgray.com",
      templateId: "d-ff657ec5e38c44baa1ee420770e3251f ",
      dynamic_template_data: {
        email: email
      }
    };

    sgMail.send(msg);
  } catch (e) {
    res.send(e);
  }
};
