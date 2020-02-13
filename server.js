// Requirements for node modules, paths and file system

const express = require("express");
const path = require("path");
const fs = require("fs");

// Initializing express functionality to app variable,
// establishing PORT location, and creating path to HTML files

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// GET routes for HTML and db.JSON API

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
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

app.get("*", function(req, res) {
    res.sendFile(path.join(publicDir, "index.html"));
});

// POST route

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

// DELETE functionality

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleted note: ${noteID}`);
    savedNotes = savedNotes.filter(selectNote => {
        return selectNote.id != noteID;
    })
    
    for (selectNote of savedNotes) {
        selectNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

// Initiate PORT

app.listen(PORT, function() {
    console.log(`CMD + CLICK to open Note Taker -> http://localhost:${PORT}`);
})
