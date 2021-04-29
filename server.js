
var express = require("express");

// express port
var app = express();
var PORT = process.env.PORT || 3000;

// Data parc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//Require routes file
require('./routes/routes')(app);

// express listening for port 
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
