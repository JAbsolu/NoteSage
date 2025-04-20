import React, { useState } from "react";
import { getCookie } from "@/util/cookies";

const API_URL = process.env.API_URL || "http://localhost";

const DeckModal = ({ closeModal, moduleId, getModuleDecks }) => {
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const token = getCookie("token");
  const userId = getCookie("userId");

  const createDeck = async () => {
    if (!moduleId) {
      console.log("Module ID not found. Unable to create deck.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/create-deck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          userId: userId,
          moduleId: moduleId,
          title: newDeckTitle,
          description: newDeckDescription,
          contents: [], // fix typo here
          public: isPublic
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Deck created successfully:", result.message);

        // Fetch the latest decks after creation
        await getModuleDecks(moduleId);

        // Close modal after decks are fetched
        closeModal();
      } else {
        console.log("Failed to create deck.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create new flashcard set</h2>

        <input
          type="text"
          placeholder="Enter deck title..."
          value={newDeckTitle}
          onChange={(e) => setNewDeckTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={newDeckDescription}
          onChange={(e) => setNewDeckDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        ></textarea>
        
        <span className="flex gap-4">
          <label className="block mt-4 text-sm">Public</label>
          <input 
            type="checkbox" 
            className="mt-4" 
            onChange={() => setIsPublic(!isPublic)} 
          />
        </span>

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={closeModal} 
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={createDeck} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckModal;
