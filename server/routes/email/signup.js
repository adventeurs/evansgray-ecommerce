const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const axios = require("axios");

const url = "https://api.sendgrid.com/v3/contactdb/lists";
try {
  axios.get(url).then(resp => {
    console.log(resp);
  });
} catch (e) {
  console.log(e);
}
