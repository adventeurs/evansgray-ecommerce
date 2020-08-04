const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(
  "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"
);

module.exports = sgMail;
