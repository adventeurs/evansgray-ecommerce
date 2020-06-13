const mail = require("express").Router();
const confirmation = require("./confirmation");
const contact = require("./contact");

mail.post("/confirmation", confirmation);
mail.post("/contact", contact);

module.exports = mail;
