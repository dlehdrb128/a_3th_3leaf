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
  const selectQuery = `
  SELECT  id,
          name,
          title
  FROM 	  volunteer
  `;

  try {
    db.query(selectQuery, (error, rows) => {
      console.log(rows, "rows");
      res.render("screens/main", { mList: rows });
    });
  } catch (error) {
    console.log(error);
    console.log("error");
  }
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

app.get("/questions", (req, res) => {
  res.render("screens/questions");
});

app.listen(PORT, () => {
  console.log(`${PORT} Express WEB Application Start!`);
});
