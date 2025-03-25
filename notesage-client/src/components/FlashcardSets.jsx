import { getCookie } from "@/util/cookies";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { PiCardsThree } from "react-icons/pi";


// API Base URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";

const FlashcardSets = ({ decks, firstName, moduleId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckId, setDeckId] = useState("");
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    if (moduleId && token) {
      getModuleDecks(moduleId);
    }
  }, [moduleId, token]);

  const getModuleDecks = async (moduleId) => {
    if (!moduleId) {
      console.log("No module id provided");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/module-decks?id=${moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      } 

      console.log("Status:", response.status, "Error fetching module decks");
    } catch (error) {
      console.log(error);
    }
  };

  //delete decks
  const deleteDeck = async(id) => {
    if (!id) {
      console.log("no deck id provided");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }

      const response = await fetch(`http://localhost/delete-deck?id=${id}`, {
        method: "DELETE",
        headers: headers
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
      }

      console.log("Status:", response.status, result.message);

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      {decks ? <h3 className="font-semibold text-lg mt-8 mb-3">Flashcard Groups</h3> : null}
      <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll">
        {decks ? decks.map((deck) => (
          <div key={deck._id} className="hover:cursor-pointer w-[95%]">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
              <span className="bg-dark-blue text-white px-2 py-2 rounded font-bold"><PiCardsThree className="text-xl font-semibold"/></span>
              <div key={deck._id} className="ml-4 min-w-[25em]">
                <h3 className="font-semibold">{deck.title}</h3>
                <p className="text-sm text-gray-600">
                  <span className="text-xs"> created by {firstName}</span>
                </p>
              </div>
              <div className="flex justify-end items-center gap-4 ms-10 w-full">
                <span
                  className="flex gap-1 hover:text-[#2489D3] hover:cursor-pointer text-xs" 
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit clicked");
                    setIsModalOpen(true);
                    setDeckId(deck._id);
                    setDeckDescription(deck.description);
                    setDeckTitle(deck.title);
                  }}
                > 
                  <FaRegEdit className="text-xl" /> 
                </span>
                <span 
                  className="flex gap-1 hover:text-red-600 hover:cursor-pointer text-xs"
                  onClick={() => {
                    deleteDeck(deck._id);
                    getModuleDecks(moduleId);
                  }}
                > 
                  <RxCross1 className="text-xl" /> 
                </span>
              </div>
            </div>
          </div> )) : null
        }
        {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} deckId={deckId} title={deckTitle} description={deckDescription} token={token} onUpdateComplete={() => getModuleDecks(moduleId)} />}
      </div>
    </>
  );
};

const Modal = ({ closeModal, deckId, title, description, token, onUpdateComplete }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [newFlashcardSetTitle, setNewFlashcardSetTitle] = useState("");
  const [newFlashcardSetDescription, setNewFlashcardSetDescription] = useState("");

  const update = async () => {
    await updateDeck(deckId);
    onUpdateComplete();
    closeModal();
  };

  const updateDeck = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    };

    const body = {
      title: newFlashcardSetTitle || title,
      description: newFlashcardSetDescription || description,
      public: isPublic
    };

    try {
      const response = await fetch(`${API_BASE_URL}/update-deck?id=${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);

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
        <h2 className="text-lg font-semibold mb-4">Update flashcard set</h2>

        <input
          type="text"
          placeholder="Enter deck title..."
          value={newFlashcardSetTitle || title}
          onChange={(e) => setNewFlashcardSetTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={newFlashcardSetDescription || description}
          onChange={(e) => setNewFlashcardSetDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        ></textarea>
        <span className="flex gap-4">
          <label className="block mt-4 text-sm">Public</label>
          <input type="checkbox" className="mt-4" onChange={() => setIsPublic(!isPublic)} />
        </span>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={update} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardSets;
