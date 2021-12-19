const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require(`morgan`);
const path = require("path");

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









app.get("/customeWrite", (req, res) => {
  res.render("screens/customeWrite");
});




app.get("/sponsor", (req, res) => {
  res.render("screens/sponsor");
});

app.get("/volunteer", (req,res)=> {
  res.render("screens/volunteer")
});

app.listen(PORT, () => {
  console.log(`${PORT} Express WEB Application Start!`);
});

