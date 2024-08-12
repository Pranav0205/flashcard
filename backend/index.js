const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pranav@020504",
  database: "flashcards_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// API Routes

// Get all flashcards
app.get("/flashcards", (req, res) => {
  const query = "SELECT * FROM flashcards";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new flashcard
app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  const query = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
  db.query(query, [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Update a flashcard
app.put("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
  db.query(query, [question, answer, id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Delete a flashcard
app.delete("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM flashcards WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
