const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8080;
const publicDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("*", function(req, res){
    res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteID = (savedNotes.length).toString();
    newNote.id = noteID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Successfully saved note:", newNote);
    res.json(savedNotes);
});






app.listen(port, function() {
    console.log(`Listening on localhost:${port}`);
});

