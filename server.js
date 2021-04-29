
var express = require("express");

// express port
var app = express();
var PORT = process.env.PORT || 3000;

// Data parce
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// express listening for port 
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
