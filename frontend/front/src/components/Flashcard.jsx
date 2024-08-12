import React from "react";

const Flashcard = ({ question, answer, isFlipped, onFlip }) => {
  return (
    <div
      onClick={onFlip}
      className="cursor-pointer bg-white shadow-md p-10 text-center rounded-lg"
    >
      {isFlipped ? <div>{answer}</div> : <div>{question}</div>}
    </div>
  );
};

export default Flashcard;
