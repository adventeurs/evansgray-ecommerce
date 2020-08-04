const express = require("express");

const app = express();
app.use(express.json());

const routes = require("./routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTION, GET, POST, PUT, DELETE");
  if ("OPTIONS" == req.method) res.sendStatus(200);
  else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use(express.static(__dirname + "/dist"));
app.use("/api/", routes);

app.all("*", (req, res) => {
  res.status(200).sendFile(__dirname + "/dist/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
