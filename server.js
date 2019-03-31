//DEPENDENCIES
require('dotenv').config()
var express = require("express");
var PORT = process.env.PORT || 8080;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongooseone";

//APP
var app = express();

//PUBLIC FOLDER
app.use(express.static("public"));

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//MONGOOSE
var mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//HANDLEBARS
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//ROUTES
var routes = require("./routes/htmlRoutes.js");
app.use(routes);

//MAIN SCREEN TURN ON
var mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function() {
    console.log("Mongoose Connected to DB Succesfully")
    app.listen(PORT, function() {
    console.log(`APP LIVE ON ${PORT}`);
  });
});

