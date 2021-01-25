// Dependencies
const express = require("express");
const fs = require("fs")
const path = require("path");

// Sets up the Express App
const app = express();
//process.env - property returns an object containing the user environment.
const PORT = 3000; //process.env.PORT || <-- this is for when we deploy to HEROKU

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files and resources
app.use(express.static("public"));

require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});