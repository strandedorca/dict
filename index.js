const express = require("express");

// Create an Express application
const app = express();
const PORT = 3000;

// My list of hard coded words and their definitions
const words = [
  {
    id: 1,
    word: "malinger",
    definition: "to pretend to be sick in order to avoid doing work",
    example:
      "He was accused of malingering to avoid his responsibilities at work.",
    createdAt: "2024-06-01T12:00:00Z",
  },
  {
    id: 2,
    word: "serendipity",
    definition:
      "the occurrence of events by chance in a happy or beneficial way",
    example: "Finding that old book in the library was pure serendipity.",
    createdAt: "2024-06-01T12:05:00Z",
  },
  {
    id: 3,
    word: "iterate",
    definition: "to perform or utter repeatedly",
    example:
      "The software development process often involves iterating on the design.",
    createdAt: "2024-06-01T12:10:00Z",
  },
];

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Personal Dictionary API!" });
});

// Route to get all words in the dictionary
app.get("/words", (req, res) => {
  res.json(words);
});

app.get("/words/:id", (req, res) => {
  const id = Number(req.params.id);
  const word = words.find((w) => w.id === id);
  if (!word) {
    return res.status(404).json({ error: "Word not found" });
  }

  res.json(word);
});

// Starts the server and listens on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
