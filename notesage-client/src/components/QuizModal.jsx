import { getCookie } from "@/util/cookies";
import React, { useState } from "react";

const QuizModal = ({ moduleId, token, closeModal}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const userId = getCookie("userId");

  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";
  
  const createModal = () => {
    createQuiz(moduleId);
    closeModal(); // Close modal after creating the deck
  };

  //create quiz
  const createQuiz = async(id) => {
    if (!id) {
      console.log("No module id provided");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          userId: userId,
          moduleId: moduleId,
          title: newTitle,
          description: newDescription,
          contents: []
        })
      })

      // get result
      const result = await response.json();

      if (response.ok) {
        console.log(response.status, "Quizz created succesfully", result);
      } else {
        console.log(response.status, result);
      }

    } catch (error) {
      console.log(error);
    }
  }

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
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
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
