const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  let { email, displayName } = req.body;

  try {
    const msg = {
      to: email,
      from: "emily@shopevansgray.com",
      templateId: "d-6a8c6a7b36f94b7d8033521513bd4d1c",
      dynamic_template_data: {
        name: displayName
          }
    };

    sgMail.send(msg);
    res.send("complete");
  } catch (e) {
    res.send(e);
  }
};
