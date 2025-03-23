"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardNavbar from "../../../components/DashboardNavbar";
import Sidebar from "../../../components/Sidebar";
import { CiSquarePlus } from "react-icons/ci";
import DeckModal from "../../../components/DeckModal";
import ModuleModal from "../../../components/ModuleModal";
import QuizModal from "@/components/QuizModal";
import AiGeneration from "@/components/AiGeneration";
import LessonGroups from "@/components/LessonGroups";

// API Base URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";

const WorkSpace = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState("");
  const [decks, setDecks] = useState([]);
  const [deckId, setDeckId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [multipleChoices, setMultipleChoices] = useState({ A: "", B: "", C: "", D: "", correct: "" });
  const [checkedItems, setCheckedItems] = useState({ A: false, B: false, C: false, D: false });

  // Handle change for checkboxes
  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    const isCurrentlyChecked = checkedItems[name];
    
    setMultipleChoices((prev) => ({
      ...prev,
      correct: name
    }));

    // Toggle behavior: deselect if already selected, otherwise select and hide others
    setCheckedItems((prev) =>
      Object.fromEntries(
        Object.keys(prev).map((key) => [key, key === name ? !isCurrentlyChecked : false])
      )
    );
  };

  // Determine if any item is selected
  const selectedKey = Object.keys(checkedItems).find((key) => checkedItems[key]);

  // handle multiplecoice form change
  const handleChoiceChange = (event) => {
    setMultipleChoices({ ...multipleChoices, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    // Ensure hydration consistency
    const storedToken = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    setToken(storedToken || null);
    setUserId(storedUserId || null);
    setLoading(false);
    
  }, []);

  useEffect(() => {
    if (userId && token) {
      getUser(userId);
      getModules(userId);
    }

    if (moduleId && token) {
      getQuizzes(moduleId);
      getModuleDecks(moduleId);
    }
  }, [userId, token]);

  /*------------------------------API CALLS-----------------------------------*/
  const getUser = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmailAddress(result.data.emailAddress);
      } else {
        console.log(response.status, response.statusText, "Error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get modules
  const getModules = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user-modules?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setModules(result.data); //save modules
        setDecks(result.data.decks); // save decks belonging to the module
        console.log("Status:", response.status, "modules fetched: ", result.data);
      } else {
        console.log("Status:", response.status, "Error fetching modules");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch decks based on the selected module
  const getModuleDecks = async (moduleId) => {
    if (!moduleId) {
      console.log("No module selected.");
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
  
      if (response.ok) {
        const result = await response.json();
        console.log("Status:", response.status, "Decks fetched", result);
        setDecks(result.data);
      } else {
        console.log("Status:", response.status, "Error fetching module decks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get quizzes
  const getQuizzes = async(id) => {
    if (!id) {
      console.log("User id required to get quizzes");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/module-quizzes?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
      })

      const result = await response.json();
      const quizzes = result.data;
      if (response.ok) {
        console.log("Status:", response.status, "user quizzes fetched", result);
        setQuizzes(quizzes);
      }

      if (!response.ok) {
        console.log("Status:", response.status, "error fetching quizzes", result);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // create flashcard
  const createFlashcard = async () => {
    if (!deckId) {
      alert("Please select a deck first!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ 
          deckId: deckId,
          front: front,
          back: back
        }),
      });

      if (response.ok) {
        const result = await response.json(); // print the result in the console to confirm the card is created
        console.log("Flashcard created successfully", result);
        setFront("");
        setBack("");
      } else {
        console.log("Error creating flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //create multiple choice
  const createMultipleChoice = async(id) => {
    if (!id) {
      console.log("Quiz id required to create multiple choice");
      return;
    }
    
    const body =  {
      quizId: id,
      question: quizQuestion,
      choices: multipleChoices
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-multiple-choice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(body)
      })

      const result = await response.json();

      if (response.ok) {
        console.log("Status", response.status, "Multiple choice has been created", result);
        setQuizQuestion("");
        setMultipleChoices({ A: "", B: "", C: "", D: "", correct: "" });
        setCheckedItems({ A: false, B: false, C: false, D: false });
      } else {
        console.log("Status", response.status, "Error creating multiple choice", result);
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Prevent rendering during hydration
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-black">Loading...</div>;
  }

  if (!token) {
    return <div className="text-center mt-10">Please log in first.</div>;
  }

  return (
    <div className="flex bg-light-gray min-h-screen">
      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
      />
      <Sidebar isExpanded={sidebarExpanded} />

      <div className="flex-1 bg-grey-200 shadow flex flex-col mt-16">
        <h1 className="mt-6 ps-3 mb-4 text-xl text-black">Welcome to your workspace</h1>

        <div className="flex flex-col bg-white border py-2 mx-2 rounded-md">
          <div className="flex">
            {/* Col 1 */}
            <div className="bg-white px-6 w-1/2 mx-2 mt-4 rounded">
              <h3 className="mb-3 text-lg font-bold text-black">Create Flashcards</h3>

              {/* Modules Selection */}
              <div className="flex text-black">
                <select
                  onChange={(e) => {
                    setModuleId(e.target.value);
                    getModuleDecks(e.target.value);
                    getQuizzes(e.target.value);
                  }}
                  className="p-2 border rounded-lg lg:w-11/12 sm:w-full me-2 pe-6"
                >
                  <option value="">Select a lesson group</option>
                  {modules.map((mod) => (
                    <option key={mod._id} value={mod._id}>
                      {mod.title}
                    </option>
                  ))}
                </select>

                <CiSquarePlus
                  onClick={() => setIsModuleModalOpen(true)}
                  className="text-4xl text-gray-400 cursor-pointer hover:text-blue-400"
                />
              </div>

              {/* Deck Selection */}
              <div className="flex mt-4">
                <select
                  onChange={(e) => setDeckId(e.target.value)}
                  className="p-2 border rounded-lg lg:w-11/12 sm:w-full me-2 pe-16"
                >
                  <option value="">Select a flashcard set</option>
                  {decks ? decks.map((deck) => (
                    <option key={deck._id} value={deck._id}>
                      {deck.title}
                    </option>
                  )): (
                    null
                  )}
                </select>

                <CiSquarePlus
                  onClick={() => {
                    if (!moduleId) {
                      alert("Please select a module first!");
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  className="text-4xl text-gray-400 cursor-pointer hover:text-blue-400"
                />
              </div>

              {/* Flashcard Input Fields */}
              <input
                type="text"
                placeholder="Flaschard front"
                className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
                value={front}
                onChange={(e) => setFront(e.target.value)}
              />
              <textarea
                placeholder="Flashcard back"
                className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
                value={back}
                onChange={(e) => setBack(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-2 mb-2 pe-8">
                <button className="bg-white py-2 px-4 me-5 text-gray-500 border rounded hover:text-blue" onClick={createFlashcard}>
                  Submit
                </button>
              </div>

              {/* Create quiz */}
              <h3 className="mb-3 mt-8 text-lg font-bold">Create Quiz</h3>
              {/* Deck Selection */}
              <div className="flex mt-4">
                <select
                  onChange={(e) => setQuizId(e.target.value)}
                  className="p-2 border rounded-lg lg:w-11/12 sm:w-full me-2 pe-16"
                >
                  <option value="">Select Quiz</option>
                  {quizzes ? quizzes.map((quiz) => (
                    <option key={quiz._id} value={quiz._id}>
                      {quiz.title}
                    </option>
                  )): (
                    null
                  )}
                </select>

                <CiSquarePlus
                  onClick={() => {
                    if (!moduleId) {
                      alert("Please select a module first!");
                    } else {
                      setIsQuizModalOpen(true);
                    }
                  }}
                  className="text-4xl text-gray-400 cursor-pointer hover:text-blue-400"
                />
              </div>

              {/* Quizz Input Fields */}
              <textarea
                placeholder="Enter Question"
                className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
                value={quizQuestion}
                onChange={(e) => setQuizQuestion(e.target.value)}
              ></textarea>
              <textarea
                type="text"
                placeholder="Choice A"
                name="A"
                className="mt-4 p-2 border h-[2.8em] lg:w-11/12 sm:w-full rounded-md"
                value={multipleChoices.A}
                onChange={handleChoiceChange}
              ></textarea>
              <textarea
                type="text"
                placeholder="Choice B"
                name="B"
                className="mt-4 p-2 border h-[2.8em] lg:w-11/12 sm:w-full rounded-md"
                value={multipleChoices.B}
                onChange={handleChoiceChange}
              ></textarea>
              <textarea
                type="text"
                placeholder="Choice C"
                name="C"
                className="mt-4 p-2 border h-[2.8em] lg:w-11/12 sm:w-full rounded-md"
                value={multipleChoices.C}
                onChange={handleChoiceChange}
              ></textarea>
              <textarea
                type="text"
                placeholder="Choice D"
                name="D"
                className="mt-4 p-2 border h-[2.8em] lg:w-11/12 sm:w-full rounded-md"
                value={multipleChoices.D}
                onChange={handleChoiceChange}
              ></textarea>
              
              {/* Correct answer checkbox */}
              <span className="flex gap-3 space-y-4">
                <p className="mt-2 text-lg">Correct choice: </p>
                {Object.keys(checkedItems).map((key, index) => {
                  // If none is selected OR this one is selected, show it
                  if (!selectedKey || selectedKey === key) {
                    return (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer mt-2">
                        <input
                          type="checkbox"
                          name={key}
                          checked={checkedItems[key]}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4"
                        />
                        <span>{`Option  ${key}`}</span>
                      </label>
                    );
                  }
                  return null; // Hide other checkboxes when one is selected
                })}
              </span>

              {/* Create flashcard button */}
              <div className="flex justify-end mt-4 mb-2 pe-8">
                <button className="bg-white py-2 px-4 me-5 text-gray-500 border rounded hover:text-blue" onClick={() => createMultipleChoice(quizId)}>
                  Submit
                </button>
              </div>
            </div>

            {/* Col 2 */}
            <div className="w-1/2">
              {/* modules */}
              <LessonGroups modules={modules} firstName={firstName} setShowDecks={moduleId} />
            </div>

          </div>

          {/* Generate with AI Section */}
          <AiGeneration/>
        </div>

        {isModuleModalOpen && <ModuleModal closeModal={() => setIsModuleModalOpen(false)} userId={userId} token={token} />}
        {isModalOpen && <DeckModal closeModal={() => setIsModalOpen(false)} moduleId={moduleId} />}
        {isQuizModalOpen && <QuizModal moduleId={moduleId} token={token} closeModal={() => setIsQuizModalOpen(false)} />}
      </div>
    </div>
  );
};

export default WorkSpace;
