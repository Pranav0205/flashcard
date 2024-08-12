// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard({ onFlashcardAdded }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    axios
      .get("http://localhost:5000/flashcards")
      .then((response) => {
        setFlashcards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  };

  const handleAddFlashcard = () => {
    axios
      .post("http://localhost:5000/flashcards", { question, answer })
      .then((response) => {
        alert("Flashcard added!");
        setQuestion("");
        setAnswer("");
        fetchFlashcards(); // Refresh the list
        if (onFlashcardAdded) onFlashcardAdded(); // Notify parent
      })
      .catch((error) => {
        console.error("Error adding flashcard:", error);
      });
  };

  const handleEditFlashcard = () => {
    axios
      .put(`http://localhost:5000/flashcards/${editFlashcard.id}`, {
        question,
        answer,
      })
      .then((response) => {
        alert("Flashcard updated!");
        setEditMode(false);
        setEditFlashcard(null);
        setQuestion("");
        setAnswer("");
        fetchFlashcards(); // Refresh the list
        if (onFlashcardAdded) onFlashcardAdded(); // Notify parent
      })
      .catch((error) => {
        console.error("Error updating flashcard:", error);
      });
  };

  const handleDeleteFlashcard = (id) => {
    axios
      .delete(`http://localhost:5000/flashcards/${id}`)
      .then((response) => {
        alert("Flashcard deleted!");
        fetchFlashcards(); // Refresh the list
        if (onFlashcardAdded) onFlashcardAdded(); // Notify parent
      })
      .catch((error) => {
        console.error("Error deleting flashcard:", error);
      });
  };

  const handleEditClick = (flashcard) => {
    setEditMode(true);
    setEditFlashcard(flashcard);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
  };

  return (
    <div className="admin-dashboard">
      <h2>{editMode ? "Edit Flashcard" : "Add Flashcard"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? handleEditFlashcard() : handleAddFlashcard();
        }}
      >
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="submit">
          {editMode ? "Update Flashcard" : "Add Flashcard"}
        </button>
      </form>

      <div className="flashcard-list">
        <h3>Existing Flashcards</h3>
        {flashcards.length > 0 ? (
          <ul>
            {flashcards.map((flashcard) => (
              <li key={flashcard.id} className="flashcard-list-item">
                <span>
                  {flashcard.question} - {flashcard.answer}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(flashcard)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteFlashcard(flashcard.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
