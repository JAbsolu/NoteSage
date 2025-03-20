import React from "react";

const QuizModal = ({ title, description, closeModal, setNewQuizTitle, setNewQuizDescription }) => {
  
  const createModal = () => {
    closeModal(); // Close modal after creating the deck
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close on background click
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Quiz</h2>

        <input
          type="text"
          placeholder="Enter quiz title..."
          value={title}
          onChange={(e) => setNewQuizTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setNewQuizDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        ></textarea>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal} // Proper function call
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={createModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
