const mongoose = require("mongoose");
require("dotenv").config();

// cloud connection-Str
let cloudDB = process.env.DATABASE;

const db = mongoose
  .connect(
    // process.env.DB_LOCAL
    cloudDB
  )
  .then(() => {
    console.log("DB connected successfully :)");
  })
  .catch(() => {
    console.log("Error connecting DB !!!");
  });

module.exports = db;
