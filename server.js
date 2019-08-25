// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// added session cookie
const cookieSession = require("cookie-session");
// Not sure if we will use it but add for now - Ray
// const bcrypt = require("bcrypt");
const methodOverride = require("method-override");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// add session cookie to website visitors - Ray
app.use(
cookieSession({
  name: "session",
  keys: ["mid term project"]
}));

// added method override to support restful route - Ray
app.use(methodOverride("_method"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const rootRoutes = require("./routes/00_root");
const homeRoutes = require("./routes/01_home");
const loginRoutes = require("./routes/02_login");
const registerRoutes = require("./routes/03_register");
const categoriesRoutes = require("./routes/04_categories");
const restaurantsRoutes = require("./routes/05_restaurants");
const cartRoutes = require("./routes/06_cart");
const checkoutRoutes = require("./routes/07_checkout");
const logoutRoutes = require("./routes/08_logout");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.use("/", rootRoutes(db));
app.use("/home", homeRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/categories", categoriesRoutes(db));
app.use("/restaurants", restaurantsRoutes(db));
app.use("/cart", cartRoutes(db));
app.use("/checkout", checkoutRoutes(db));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
