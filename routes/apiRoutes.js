const path = require("path");
const fs = require ("fs");

var notes = [];
// Function will be called to write newnotes to the db.json
function writeNote(newNote) {
  fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) =>
    err ? console.error(err) : console.log('Success!')
  );
}

module.exports = function (app){
  
  //apiRoutes
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  app.post("/api/notes", function(req, res) {
    var newNote = req.body
    // newNote.id = Math.floor(Math.random() * 1000);

    //Read the notes empty array and parse the data.
    fs.readFile('./db/db.json', "utf-8", (err, data) => {
      notes = JSON.parse(data);
     if (err) throw err;
    //Push the data of notes to newNote and run the write function to notes
     notes.push(newNote);
     writeNote(notes);
     res.send();

   });
  });

  
  app.delete('/api/notes/:id', function (req, res) {
   //chosen variable adds an id to each newNote
    var chosen = req.params.id;
    // console.log(chosen);

    fs.readFile('./db/db.json', "utf-8", (err, data) => {
     if (err) throw err;
     notes = JSON.parse(data);

      var notesIndex = notes.findIndex(i => i.id == chosen);
      console.log(notesIndex);
      notes.splice(notesIndex, 1);
      writeNote(notes)

   });

    return res.send("No character found");

  })


}
