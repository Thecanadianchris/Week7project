const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const PORT = 3001;
const dataFilePath = path.join(__dirname, "data.json");

function readNotes() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

function writeNotes(notes) {
  fs.writeFileSync(dataFilePath, JSON.stringify(notes, null, 2));
}


app.use(express.json());

app.get("/", (req, res) => {
  res.send("notes app is alive");
});
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: uuidv4(),
    text: req.body.text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});