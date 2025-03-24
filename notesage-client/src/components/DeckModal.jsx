import React, { useState } from "react";
import Cookies from "js-cookie";

const DeckModal = ({ closeModal, moduleId }) => {
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const token = Cookies.get("auth-token");

  // create dekcs
  const createDeck = async () => {
    if (!moduleId) {
      console.log("Module ID not found. Unable to create deck.");
      return;
    }

    console.log("Creating deck for module ID:", moduleId);

    try {
      const response = await fetch(`http://localhost/create-deck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          moduleId: moduleId,
          title: newDeckTitle,
          description: newDeckDescription,
          contens: [],
          public: isPublic
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(response.status, response.statusText, "Deck created successfully", result);
        closeModal(); // Close modal after successful creation
      } else {
        console.log(response.status, response.statusText, "Failed to create deck.");
      }
    } catch (error) {
      console.log(error);
    }

    getModuleDecks(moduleId);
  };

  // get module decks
  const getModuleDecks = async (id) => {
    if (!id) {
      console.log("No module selected.");
      return;
    }

    try {
      const response = await fetch(`http://localhost/module-decks?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Status:", response.status, result.message);
        setDecks(result.data);
      } else {
        console.log("Status:", response.status, result.message);
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
        <h2 className="text-lg font-semibold mb-4">Create New Deck</h2>

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
          <input type="checkbox" className="mt-4" onChange={() => isPublic ? setIsPublic(false) : setIsPublic(true)}/>
        </span>
       

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={() => {
              createDeck();
              getModuleDecks(moduleId)
            }} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckModal;