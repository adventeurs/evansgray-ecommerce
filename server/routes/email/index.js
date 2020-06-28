const mail = require("express").Router();
const confirmation = require("./confirmation");
const contact = require("./contact");
const newAccount = require("./new-account");
const signup = require("./signup");

mail.post("/confirmation", confirmation);
mail.post("/contact", contact);
mail.post("/new-account", newAccount);
mail.post("/signup", signup);

module.exports = mail;
