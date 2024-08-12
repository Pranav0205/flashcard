import React from "react";

const FlashcardList = ({ flashcards, onEdit, onDelete }) => {
  return (
    <ul className="space-y-2">
      {flashcards.map((flashcard) => (
        <li key={flashcard.id} className="p-4 bg-gray-100 rounded shadow">
          <div className="flex justify-between items-center">
            <span>{flashcard.question}</span>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(flashcard)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(flashcard.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FlashcardList;
