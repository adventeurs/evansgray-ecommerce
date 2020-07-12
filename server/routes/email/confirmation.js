const sgMail = require("./sendgrid");

module.exports = (req, res) => {
  let { items, id, name, shipping, email } = req.body;
  console.log(email);
  for (let i = 0; i < items.length; i++) {
    items[i].amount = items[i].amount / 100;
  }

  items = items.filter(item => (item.type = "sku"));

  try {
    const msg = {
      to: email,
      from: "Emily from Evansgray <emily@shopevansgray.com>",
      templateId: "d-04dc14d886284fe1a52b05d4ca685364",
      dynamic_template_data: {
        items: items,
        orderNumber: id,
        name: name,
        shipping: shipping
      }
    };

    sgMail.send(msg).then(
      () => {
        res.send(msg);
      },
      error => {
        console.log(error.response.body);
        res.send(error.response.body);
      }
    );
  } catch (e) {
    res.send(e);
  }
};
