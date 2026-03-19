const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "words.json");

// Create an Express application
const app = express();
// Middleware to parse JSON bodies
// This reads the raw request body and attaches the parsed JSON to req.body
// Without this, req.body would be undefined
// Middleware order matters!
app.use(express.json());

function readWordsFromFile() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function writeWordsToFile(words) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(words, null, 2));
}

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Personal Dictionary API!" });
});

// Route to get all words in the dictionary
app.get("/words", (req, res) => {
  // res.json(words);
  const words = readWordsFromFile();
  res.json(words);
});

app.get("/words/:id", (req, res) => {
  const words = readWordsFromFile();
  const id = Number(req.params.id);
  const word = words.find((w) => w.id === id);

  if (!word) {
    return res.status(404).json({ error: "Word not found" });
  }

  res.json(word);
});

app.post("/words", (req, res) => {
  const words = readWordsFromFile();
  const { word, definition, example } = req.body;
  if (!word || !definition) {
    return res.status(400).json({ error: "Word and definition are required" });
  }

  const newWord = {
    id: words.length + 1,
    word,
    definition,
    example: example || "",
    createdAt: new Date().toISOString(),
  };

  words.push(newWord);
  writeWordsToFile(words);
  res.status(201).json(newWord);
});

// Starts the server and listens on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
