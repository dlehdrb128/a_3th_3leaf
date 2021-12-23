const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require(`morgan`);
const path = require("path");
const mysql2 = require("mysql2");

const app = express();

const PORT = 4000;

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});


app.set("view engine", "pug");
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("screens/main");
// });

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

app.get("/GoSponsor", (req,res) => {
  res.render("screens/sponsor");
})

app.post("/SponsorInformation", (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  let money = req.body.money;
  let type = req.body.type;

  const sponsorInsertQuery = `
    INSERT INTO sponsor (type, name, phoneNumber, price, time) VALUES
    (
      "${type}",
      "${name}",
      "${phone}",
      "${money}",
      now()
    )
  `;
  try {
    db.query(sponsorInsertQuery, (error, rows) => {
      if(error) {
        console.error(error);
        throw Error("failed query");
      }
      return res.redirect("/sponsor");
    })
  } catch (e) {
    console.error(e);
    return res.redirect("/sponsor");
  }
});

app.get("/volunteer", (req, res) => {
  res.render("screens/volunteer");
});

app.post("/volunteers", (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let title = req.body.title;
  let contents = req.body.contents;

  const volunteerQuery = `
    INSERT INTO volunteer (name, mobile, title, contents, createAt) VALUES
    (
      "${name}",
      "${mobile}",
      "${title}",
      "${contents}",
      now()
    )
  `;
  try {
    db.query(volunteerQuery, (error, rows)=>{
      if(error) {
        console.error(error);
        throw Error("failed query");
      }
      return res.redirect("/volunteer");
    })
  } catch(e) {
    console.error(e);
    return res.redirect("/volunteer");
  }


});

app.get("/questions", (req, res) => {
  res.render("screens/questions");
});

app.get("/introduce", (req, res) => {
  res.render("screens/introduce");
});

app.listen(PORT, () => {
  console.log(`${PORT} Express WEB Application Start!`);
});


