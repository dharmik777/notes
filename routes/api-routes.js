const router = require("express").Router();
const fs = require('fs');
const util = require('util');

const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


function readNotes() {
    return readFileAsync("./db/db.json", "utf8");
}

router.get("/api/notes", (req, res) => {
    readNotes().then(notes => {
        notes = JSON.parse(notes)
        res.json(notes)
    })

});

router.post("/api/notes", (req, res) => {
    let newNotes = req.body;


    var title = req.body.title;
    var text = req.body.text;
    var newNote = { title, text, id: uuidv4() };
   
    console.log(newNotes);


    readNotes().then(notes => {
        notes = JSON.parse(notes)
        notes.push(newNote)

        writeFileAsync("./db/db.json", JSON.stringify(notes)).then(response => res.json(true)).catch(err => console.log(err))
    })
   

});

router.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    readNotes().then(notes => {
        notes = JSON.parse(notes)

        let newArr = notes.filter(note => {
            return note.id !== id;
        })

        writeFileAsync("./db/db.json", JSON.stringify(newArr)).then(response => res.json(true)).catch(err => console.log(err))

    })
})


module.exports = router;

