import React, { useState, useEffect } from "react";
import axios from "axios";

const FlashcardContainer = ({ refresh }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/flashcards");
      setFlashcards(response.data);
      setCurrentIndex(0); // Reset to the first card
      setFlipped(false); // Reset flip state
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [refresh]); // Refetch when refresh changes

  const handleNext = () => {
    if (flashcards.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (flashcards.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
      );
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped((prevFlipped) => !prevFlipped);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((card) => card.id !== id)
      );
      setCurrentIndex((prevIndex) => {
        if (flashcards.length === 1) return 0;
        if (prevIndex >= flashcards.length - 1) return flashcards.length - 2;
        return prevIndex;
      });
      setFlipped(false); // Reset flip state
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="flashcard-container">
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        <div className="flashcard">
          <div
            className={`flashcard-content ${flipped ? "flipped" : ""}`}
            onClick={handleFlip}
          >
            <div className="flashcard-front">
              <p>{flashcards[currentIndex].question}</p>
            </div>
            <div className="flashcard-back">
              <p>{flashcards[currentIndex].answer}</p>
            </div>
          </div>
          <div className="flashcard-controls">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <button onClick={() => handleDelete(flashcards[currentIndex].id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardContainer;
