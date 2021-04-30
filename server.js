// install express
var express = require("express");


// express is being set up
var app = express();
var PORT = process.env.PORT || 3000;

// data parsing from express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require('./routes/htmlRoute')(app);
require("./routes/apiRoute")(app);


// server starts listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});