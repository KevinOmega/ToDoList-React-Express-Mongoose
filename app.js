const express = require("express");
const fs = require("fs");
const join = require("path").join;
const mongoose = require("mongoose");
const passport = require("passport");

const models = join(__dirname, "app/models");
const app = express();

fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

require("./config/express")(app, passport);

mongoose.connect(
  `mongodb+srv://KevinOmega:${process.env.MONGO_PASSWORD}@cluster0.tjmkurq.mongodb.net/todolistDB`
);

require("./config/passport")(passport);

require("./config/routes")(app, passport);

module.exports = app;
