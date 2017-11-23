const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");

const session = require("express-session");
const passport = require("passport");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Import routes.
require('./routes.js')(app, passport);

// Launch server
app.listen(PORT, () => {
    console.log("Server listening on port %d", PORT);
});
