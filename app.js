const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require(`morgan`);
const path = require("path");

// modify test

const app = express();

const PORT = 4000;

const test = "aaa"

const test2 = "222"

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("screens/index");
});

app.get("/company", (req, res) => {
  res.render("screens/company");
});

app.get("/question", (req, res) => {
  res.render("screens/question");
});

app.listen(PORT, () => {
  console.log(`${PORT} Express WEB Application Start!`);
});
