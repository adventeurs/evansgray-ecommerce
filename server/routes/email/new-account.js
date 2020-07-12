const sgMail = require("./sendgrid");

// const msg = {
//   to: "adventeurs@gmail.com",
//   from: "emily@shopevansgray.com",
//   templateId: "d-b69871b7ea9d4b218b6696e6fa146d75",
//   dynamic_template_data: {
//     name: "Justin"
//   }
// };

// sgMail.send(msg).then(
//   () => {},
//   error => {
//     console.log(error.response.body);
//     res.send(error.response.body);
//   }
// );

module.exports = async (req, res) => {
  let { email, displayName } = req.body;

  const msg = {
    to: email,
    from: "emily@shopevansgray.com",
    templateId: "d-b69871b7ea9d4b218b6696e6fa146d75",
    dynamic_template_data: {
      name: displayName
    }
  };

  sgMail.send(msg).then(
    () => {},
    error => {
      console.log(error);
      res.send(error);
    }
  );
};
