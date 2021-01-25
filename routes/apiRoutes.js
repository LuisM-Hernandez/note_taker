
const path = require("path");
const fs = require ("fs");

var notes = [];


function writeNote(newNote) {
  fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) =>
    err ? console.error(err) : console.log('Success!')
  );
}

module.exports = function (app){
  
  app.get("/api/notes", function(req, res) {
    
    return res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  app.post("/api/notes", function(req, res) {
    var newNote = req.body
    newNote.id = Math.floor(Math.random() * 1000);

    fs.readFile('./db/db.json', "utf-8", (err, data) => {
      notes = JSON.parse(data);
     if (err) throw err;
     console.log(notes);
     console.log(newNote);
     
     notes.push(newNote);
     writeNote(notes);
     res.send();
   
   });
  });
}