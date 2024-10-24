const express = require("express");

const app = express();
const dbConfig = require("./config/dbConfig");
require("dotenv").config();

const portofolioRoute = require("./routes/portofolioRoute");

app.use(express.json());

app.use("/api/portofolio", portofolioRoute);

const port = process.env.PORT || 8080;

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Running on port ${port}!`);
});
