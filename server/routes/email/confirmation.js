const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  let { items, id, name, shipping, email } = req.body;

  for (let i = 0; i < items.length; i++) {
    items[i].amount = items[i].amount / 100;
  }

  items = items.filter(item => item.type != "sku");

  try {
    const msg = {
      to: email,
      from: "emily@shopevansgray.com",
      templateId: "d-9229a28e33e948f7a4eb8b1833557825",
      dynamic_template_data: {
        items: items,
        orderNumber: id,
        name: name,
        shipping: shipping
      }
    };

    sgMail.send(msg);
    res.send("complete");
  } catch (e) {
    res.send(e);
  }
};
