import { useState } from "react";
import { FiPlus, FiTrash2, FiImage } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { useEffect } from "react";

const FlashcardsComponent = ({firstName, lastName, emailAddress, module, userId, token}) => {

  const [modules, setModules] = useState([]); // Modules list
  const [selectedModule, setSelectedModule] = useState(""); // Selected module
  const [showNewModuleInput, setShowNewModuleInput] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);

  //chose whether to show quiz creation form
  const [changeTab, setTab] = useState("flashcards");

  async function getModules(){
    try {
      const url = `http://localhost/user-modules?id=${userId}`;
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }  
      });

      const result = await request.json();

      if (request.ok) {
        setModules([...modules, result]);
        setSelectedModule(result._id);
        setNewModuleTitle(result.title);
        setShowNewModuleInput(false);
      }
      
    } catch(error) {
      console.error(error);
    }
  }

  // // Use effect to get modules live
  // useEffect(() => {
  //   getModules();
  // }, [])

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
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="" name="module" id="">Select a module</option>
                  {modules.map((mod) => (
                    <option key={mod._id} value={mod._id}>
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

            {/* New Module Input */}
            {showNewModuleInput && (
              <div className="ms-4 w-1/2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter module name"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="p-2 mt-2 border rounded-lg w-80 me-2"
                />
                <button
                  onClick={handleNewModuleSubmit}
                  className="bg-blue text-white px-2 font-semibold py-2 rounded-lg hover:bg-blue-400"
                >
                  Create
                </button>
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

            {/* Deck Details */}
            <div className="mt-4 mb-6 bg-white pt-4 pb-2 px-4 rounded-lg">
              <h2 className="text-lg font-regular mb-4">Deck details</h2>
              <input
                type="text"
                placeholder="Enter deck title..."
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                className="w-full p-3 border rounded-lg mb-2"
              />
              <textarea
                placeholder="Add a description..."
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
              ></textarea>
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
            <button onClick={addFlashcard} className="mt-3 bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Add Flashcard
            </button>
          </div>

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