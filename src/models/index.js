const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.connect = mongoose.connect(dbConfig.url, {});
db.auth = require("./auth.js")(mongoose);

module.exports = db;
