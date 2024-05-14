const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

mongoose.Promise = global.Promise;

const db = {};

db.connect = mongoose.connect(dbConfig.url, {});
db.auth = require("./auth.models.js")(mongoose);
db.user = require("./user.models.js")(mongoose);
db.book = require("./book.models.js")(mongoose);

module.exports = db;
