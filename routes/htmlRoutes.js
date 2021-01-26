
const path = require("path");

module.exports = function (app){
    
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  //Should read the db.json file and return all saved notes as JSON.
  app.get("/api/notes", function(req, res) {
    
    return res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}

