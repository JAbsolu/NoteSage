import { useState } from "react";
import { FiPlus, FiTrash2, FiImage } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { useEffect } from "react";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import Cookies from "js-cookie";


const FlashcardsComponent = ({firstName, lastName, emailAddress, module, userId, token}) => {
  //modules
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [showNewModuleInput, setShowNewModuleInput] = useState("");
  // decks
  const [decks, setDecks] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckDescription, setDeckDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);
  const [checkToggle, setToggle] = useState(false);
  const [statusMessage, setStatusMessage] = useState("")
  const [statusError, setStatusError] = useState("")
  const [notifications, addToNotifactions] = useState([])

  //chose whether to show quiz creation form
  const [changeTab, setTab] = useState("flashcards");

  //get user id from cookies
  const getModules = async(id) =>{
    try {
      const url = `http://localhost/user-modules?id=${id}`;
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }  
      });

      const result = await request.json();

      if (request.ok) {
        const data = result.data;
        setModules([...data]);
        console.log(data.decks)
        addToNotifactions((prev) => [...prev, result.message]);
      }
      
    } catch(error) {
      console.error(error);
      setStatusError(error)
    }
  }

  // get user module decks
  const getModuleDecks = async(moduleId) => {
    if (!moduleId) {
      alert("Please select a module first");
      return;
    }

    try {
      const response = await fetch(`http://localhost/module-decks?id=${moduleId}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      if (!response.ok) {
        console.log(response.status, response.statusText, `Error fetching module ${moduleId} dekcs`);
        return;
      }

      const result = response.json();
      console.log(response.status, response.statusText, "Fetched module dekcs", result, "result decks", result.decks);

  } catch(error) {
    console.log(error)
  }
}

  //handle flashcard change
  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const removeFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

   // create new module
   const handleModuleCreating = async () => {
    const moduleData = {
      userId: userId,
      title: newModuleTitle,
      public: checkToggle, 
    };
    
    try {
      const url = `http://localhost/create-module`;

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(moduleData)
      })

      if (request.ok) {
        const result = await request.json();
        console.log(result);
        addToNotifactions((prev) => [...prev, result.message]);
      }
    } catch(error) {
      console.log(error);
      setStatusError(error);
    }
  }

  // create new deck
  const createDeck = async () => {
    try {
      const deckData = {
        moduleId: moduleId,
        title: deckTitle,
        description: deckDescription
      }

      const response = await fetch(`http:/localhost/create-deck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(deckData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        console.log(result.message);
        addToNotifactions((prev) => [...prev, result.message]);
      }

    } catch (error) {
      console.log(error);
      setStatusError(error);
    }
  };

  // use useeffect
  useEffect( function() {
    getModules(userId);

    localStorage.setItem("notifications", JSON.stringify(notifications));
  },[]);

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-16">

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-regular">Your workspace for creating new flashcards and quizzes</h1>
            <div className={`flex items-center space-x-2`}>
              <button 
                className="text-sm text-gray-500 me-2 bg-white  px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("flashcards");
                  localStorage.setItem("tab", "flashcards");
                  window.location.reload();
                }}
              >
                Create flashcards
              </button>
              <button 
                className="text-sm text-gray-500 bg-white  px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("quizzes");
                  localStorage.setItem("tab", "quiz");
                  window.location.reload();
                }} 
              >
                Create quizzes
              </button>
            </div>
          </div>
          

          {/* Module Selection */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <div className="mt-2 bg-white px-4 pt-0 rounded-lg">
              <h2 className="text-lg font-regular mb-4">Select or create a module</h2>
              <div className="flex items-center space-x-4">
                <select
                  // value={selectedModule}
                  // onChange={(e) => setSelectedModule(e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="" name="module" id="">Select a module</option>
                  {modules.map((mod) => (
                    <option key={mod._id} value={mod._id} onChange={(e) => {
                      setModuleId(e.target.value);
                      getModuleDecks(e.target.value)
                    }}>
                      {mod.title}
                    </option>
                  ))}
                </select>
                {/* Add New Module Button */}
                <button
                  onClick={() => setShowNewModuleInput(true)}
                  className="bg-blue text-white px-5 py-2 rounded-lg hover:bg-blue-400"
                >
                  <FiPlus size={20}/>
                </button>
              </div>
            </div>

            {showNewModuleInput && (
              <div className="ms-4 w-1/2 flex items-center space-x-2">
                {/* Input for Module Name */}
                <input
                  type="text"
                  placeholder="Enter module name"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="p-2 mt-2 border rounded-lg w-80 me-2"
                />

                {/* Private/Public Toggle */}
                <label className="flex items-center">
                  <div className="flex flex-col gap-2 justify-center mt-3 items-center">
                    <span>Private</span>
                    <FaRegCircleCheck
                      className={`me-4 ms-3 text-xl ${checkToggle ? "block" : "hidden"}`}
                      onClick={() => setToggle(false)} // Set to Public
                    />
                    <FaRegCircle
                      className={`me-4 ms-3 text-xl ${checkToggle ? "hidden" : "block"}`}
                      onClick={() => setToggle(true)}  // Set to Private
                    />
                  </div>
                  <span className="text-green-600">{statusMessage}</span>
                </label>

                {/* Submit Button */}
                <div className="ps-6">
                  <button
                    onClick={handleModuleCreating}
                    className="bg-blue text-white px-2 font-semibold py-2 mt-2 rounded-lg hover:bg-blue-400"
                  >
                    Create
                  </button>
                </div>
                
              </div>
            )}

            {/* Generate with AI Section */}
            <div className="bg-white p-6 rounded-lg mt-6">
              <div className="flex">
                <h2 className="text-lg font-regular mb-4 me-1">Generate from text with AI</h2>
                <BsStars className="mt-1 text-lg"/>
              </div>
              <textarea className="w-full p-4 border rounded-lg bg-gray-100" placeholder="Add your notes here"></textarea>
              <div className="flex items-center mt-4 space-x-4">
                <button className="flex items-center space-x-2 bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                  {/* <FiUpload /> */}
                  <span>Upload file</span>
                </button>
                <button className=" bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                  Generate Flashcards
                </button>
              </div>
            </div>

          {/* Deck Selection with Plus Button */}
          <div className="mt-4 mb-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-regular mb-4">Select or Create a Deck</h2>
            <div className="flex items-center space-x-2">
              {/* Dropdown for existing decks */}
              <select
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                className="p-3 border rounded-lg w-full"
              >
                <option value="">Select a deck</option>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.title}>
                    {deck.title}
                  </option>
                ))}
              </select>

              {/* Button to Open Modal for New Deck */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
              >
                <FiPlus size={20} />
              </button>
            </div>

            {/* Disabled Input for Deck Description */}
            <textarea
              placeholder="Deck Description"
              value={deckDescription}
              disabled
              className="w-full p-3 border rounded-lg mt-2 bg-gray-100 text-gray-500"
            />
            <p className={`${statusError ? "text-red-600": "text-green-600"}`}>{ statusError !== "" ? statusError : statusMessage }</p>
          </div>

                {/* Flashcard Entry Section */}
                <div className="mt-4 bg-white px-4 pt-2 rounded-lg">
                  <h2 className="text-lg font-regular mb-2">Flashcards</h2>
                  {flashcards.map((card, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2 flex items-center space-x-4">
                      <span className="text-lg font-bold">{index + 1}</span>
                      <input
                        type="text"
                        placeholder="Enter term"
                        value={card.term}
                        onChange={(e) => handleFlashcardChange(index, "term", e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Enter definition"
                        value={card.definition}
                        onChange={(e) => handleFlashcardChange(index, "definition", e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                      />
                      <button className="p-2 bg-gray-200 rounded-lg">
                        <FiImage size={20} />
                      </button>
                      <button
                        onClick={() => removeFlashcard(index)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  ))}

                  {/* Add Flashcard Button */}
                  <button onClick={addFlashcard} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Add Flashcard
                  </button>
                </div>

                {isModalOpen && (
            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsModalOpen(false); // Close on background click
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

                {/* Modal Actions */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
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
          )}
           {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Create Flashcards
            </button>
          </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default FlashcardsComponent;