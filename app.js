const express = require("express");
const db = require("./config/db");

const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

const app = express();

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// json to decode the data send in form of json

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
