const express = require("express");
const { pool } = require("./db");

pool.query(
  `CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    console.log("results", results);
  }
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/values", (req, res, next) => {
  console.log("/api/values");
  pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post("/api/values", (req, res, next) => {
  console.log(req.body);
  pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json({ success: true, value: req.body.value });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
