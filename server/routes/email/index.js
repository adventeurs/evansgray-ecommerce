const mail = require("express").Router();
const confirmation = require("./confirmation");
const contact = require("./contact");
const newAccount = require("./new-account")

mail.post("/confirmation", confirmation);
mail.post("/contact", contact);
mail.post("/new-account", newAccount);

module.exports = mail;
