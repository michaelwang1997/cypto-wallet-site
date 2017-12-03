const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");

const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");

const dbConfig = require('./config/database.js');

mongoose.connect(dbConfig.url, {
	useMongoClient: true,
});

require('./config/passport.js')(passport);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

/*function defaultContentTypeMiddleware (req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json';
  next();
}*/

// app.use(defaultContentTypeMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Import routes
require('./routes.js')(app, passport);
require('./api.js')(app);

// Launch server
app.listen(PORT, () => {
    console.log("Server listening on port %d", PORT);
});
