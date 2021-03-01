const db = require("../data/db.json");
const fs = require("fs");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.send(db);
  });

  app.post("/api/notes", function(req, res) {

    let newNote = {
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("../data/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("../data/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("created")
      });
    });
  });

  app.delete("/api/notes/", (req, res) => {


    fs.readFile("../db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);
      

      fs.writeFile("../db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("deleted")
      });
    });
  });
};