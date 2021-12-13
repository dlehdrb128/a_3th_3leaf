const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require(`morgan`);
const path = require("path");

// modify test

const app = express();

const PORT = 4000;


app.set("view engine", "pug");
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("screens/main");
});

app.get("/besiness", (req, res) => {
  res.render("screens/besiness");
});

app.get("/custome", (req, res) => {
  res.render("screens/custome");
});

app.get("/support", (req, res) => {
  res.render("screens/support");
});

app.listen(PORT, () => {
  console.log(`${PORT} Express WEB Application Start!`);
});
