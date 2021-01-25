// Dependencies
const express = require("express");
const fs = require("fs")
const path = require("path");
var jsonFile = require("./db/db.json");

// const apiRoutes = require("./routes/apiRoutes")
// const htmlRoutes = require("./routes/htmlRoutes")

// Sets up the Express App
const app = express();
//process.env - property returns an object containing the user environment.
const PORT = 3000; //process.env.PORT ||

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files and resources
app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);


// Routes
// =============================================================
// The following HTML routes should be created:
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.join(__dirname, "/db/db.json"));
});
//ReadFile
fs.readFile('./db/db.json',  "utf-8", (err, data) => {
  var note = JSON.parse(data);
  if (err) throw err;
  console.log(data);

  //POST
  app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  note.push(newNote);
  writeNote();
  return console.log("note" + newNote.title);
// fs.appendFile("./db/db.json", JSON.stringify(newNote), (err) => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });
});

function writeNote() {
  fs.writeFile("./db/db.json", JSON.stringify(note), (err) =>
err ? console.error(err) : console.log('Success!')
);
}
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
