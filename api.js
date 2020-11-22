//Dependancies 
const path = require('path');
const fs = require('fs');


module.exports = app => {


// Reads Whatever is inserted in db.json file
    fs.readFile("db/db.json","utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

//GET request for api/notes
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });


// Route for POST Request 
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Nice New Note: "+ newNote.title);
        });


// Dynamically retrieves note with ID 
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });


// Delete Note Feature 
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });


//Routes to Webpages 
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "/public/notes.html"));
        });
        

//goes to index.html home page by default
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "/public/index.html"));
        });


// Updated the JSON file and stores data in server
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}