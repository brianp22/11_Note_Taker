const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8080;
const publicDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(publicDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.listen(port, function() {
    console.log(`Listening on localhost:${port}`);
});