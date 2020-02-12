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

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.listen(port, function() {
    console.log(`Listening on localhost:${port}`);
});

