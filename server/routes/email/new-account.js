const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  let { email, displayName } = req.body;

  try {
    const msg = {
      to: email,
      from: "emily@shopevansgray.com",
      templateId: " d-b69871b7ea9d4b218b6696e6fa146d75",
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
