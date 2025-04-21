import { getCookie } from "@/util/cookies";
import { useCallback, useEffect, useState } from "react";
import { PiCardsThree } from "react-icons/pi";
import { FiMoreHorizontal } from "react-icons/fi";

const API_URL = process.env.API_URL || "http://localhost:/5000";

const FlashcardSets = ({ decks, firstName, moduleId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckId, setDeckId] = useState("");
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const token = getCookie("token");

  const getModuleDecks = useCallback(
    async (moduleId) => {
      if (!moduleId) return;

      try {
        const response = await fetch(`${API_URL}/module-decks?id=${moduleId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const result = await response.json();
        if (!response.ok) {
          console.log("Status:", response.status, result.message);
          return;
        }

        console.log("Decks fetched:", result.message);
      } catch (error) {
        console.log(error);
      }
    },
    [token]
  );

  const deleteDeck = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete-deck?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
      }

      console.log("Deleted:", response.status, result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDeck = async (id) => {
    await deleteDeck(id);
    await getModuleDecks(moduleId);
  };

  useEffect(() => {
    if (moduleId && token) {
      getModuleDecks(moduleId);
    }
  }, [moduleId, token, getModuleDecks]);

  return (
    <>
      {decks && <h3 className="font-semibold text-lg mt-8 mb-3">Flashcard Groups</h3>}
      <div className="flex flex-wrap gap-4 w-full text-black">
        {decks &&
          decks.map((deck) => (
            <div key={deck._id} className="hover:cursor-pointer w-[95%]">
              <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition justify-between">
                <div className="flex items-center">
                  <span className="bg-black text-white px-3 py-3 rounded font-bold">
                    <PiCardsThree className="text-xl font-semibold" />
                  </span>
                  <div className="ml-4 min-w-[25em]">
                    <h3 className="font-semibold">{deck.title}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="text-xs"> created by {firstName}</span>
                    </p>
                  </div>
                </div>

                {/* Dropdown actions */}
                <div className="relative text-black">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === deck._id ? null : deck._id);
                      setDeckId(deck._id);
                      setDeckTitle(deck.title);
                      setDeckDescription(deck.description);
                    }}
                    className="p-2 hover:bg-gray-300 rounded-full"
                  >
                    <FiMoreHorizontal size={18} />
                  </button>

                  {activeDropdown === deck._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 text-black">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                          setActiveDropdown(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDeck(deck._id);
                          setActiveDropdown(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)}
            deckId={deckId}
            title={deckTitle}
            description={deckDescription}
            token={token}
            onUpdateComplete={() => getModuleDecks(moduleId)}
          />
        )}
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
      Authorization: token,
    };

    const body = {
      title: newFlashcardSetTitle || title,
      description: newFlashcardSetDescription || description,
      public: isPublic,
    };

    try {
      const response = await fetch(`${API_URL}/update-deck?id=${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Updated:", response.status, result.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 text-black"
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
            onClick={update}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardSets;
