import React, { useState, useEffect } from "react";

const FlashcardForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ question: "", answer: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="question"
          value={formData.question || ""}
          onChange={handleChange}
          placeholder="Question"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="answer"
          value={formData.answer || ""}
          onChange={handleChange}
          placeholder="Answer"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {initialData.id ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default FlashcardForm;
