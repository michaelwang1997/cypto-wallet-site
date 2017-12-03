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

// Import routes.
require('./routes.js')(app, passport);

app.post("/api/messages", function(req, res) {
	var body = req.body;
	console.log(body);
	res.contentType("application/json");
	res.status(200).send(JSON.stringify(messages));
	})

app.get("/api/messages", function(req, res) {
    res.send(messages);
	})

app.delete("/api/messages/:id", function(req, res) {
	var messageId = req.param.id;
	console.log("Message Id is " + messageId);
	/*messages[req.params.id] = null;
	console.log(messages);*/
})

// Launch server
app.listen(PORT, () => {
    console.log("Server listening on port %d", PORT);
});

var messageCount = 1;
var messages = {
    	0: "Test message"
    };
