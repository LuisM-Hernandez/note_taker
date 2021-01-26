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
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  app.post("/api/notes", function(req, res) {
    //This variable will be used to
    var newNote = req.body
    newNote.id = Math.floor(Math.random() * 1000);

    fs.readFile('./db/db.json', "utf-8", (err, data) => {
      notes = JSON.parse(data);
     if (err) throw err;
    //  console.log(notes);
    //  console.log(newNote);
     
     notes.push(newNote);
     writeNote(notes);
     res.send();

   });
  });

  app.delete('/api/notes/:id', function (req, res) {
   
    //Tragets the id
    var chosen = req.params.id;
    console.log(chosen);

    fs.readFile('./db/db.json', "utf-8", (err, data) => {
     if (err) throw err;
     notes = JSON.parse(data);

      // const result = notes.filter(notes => chosen === notes);
      // console.log(result);
      // for (var i=0; i<notes.length; i++) {
      // }
      // console.log(notes[0].id);
      var notesIndex = notes.findIndex(i => i.id == chosen);
      console.log(notesIndex);
      notes.splice(notesIndex, 1);
      writeNote(notes)


   });

    return res.send("No character found");

  })


}

