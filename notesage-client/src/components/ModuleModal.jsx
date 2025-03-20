import { getCookie } from "@/util/cookies";
import React from "react";

const ModuleModal = ({ title, description, closeModal, setNewModuleTitle, setNewModuleDescription }) => {
  const userId = getCookie("userId");
  
  const createModal = () => {
    createModule();
    closeModal(); // Close modal after creating the deck
  };

  // create module
  const createModule = async () => {
    if (!userId) {
      console.log("User id required!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-module`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ 
          userId: userId,
          title: title,
          decks: [],
          tests: [],
          public: true
        }),
      });

      if (response.ok) {
        const result = await response.json(); // print the result in the console to confirm the card is created
        console.log(response.status, "Flashcard created successfully", result);
      } else {
        console.log(response.status, "Error creating flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close on background click
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Deck</h2>

        <input
          type="text"
          placeholder="Enter deck title..."
          value={title}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setNewModuleDescription(e.target.value)}
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

export default ModuleModal;
