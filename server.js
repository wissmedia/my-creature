const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 4001;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes/api.js"));

try {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://user:user@homelab.local:27018/petdb")
    .then(() => {
      console.log(`Connected to Mongo`)
      app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
      });
    })
} catch (error) {
  console.log(error)
}