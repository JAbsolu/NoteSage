"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardNavbar from "../../../components/DashboardNavbar";
import Sidebar from "../../../components/Sidebar";
import { CiSquarePlus } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import DeckModal from "../../../components/DeckModal";
import ModuleModal from "../../../components/ModuleModal";
import QuizModal from "@/components/QuizModal";

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
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure hydration consistency
    const storedToken = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    setToken(storedToken || null);
    setUserId(storedUserId || null);
    setLoading(false);
    console.log("Decks from state: ", decks);
    
  }, []);

  useEffect(() => {
    if (userId && token) {
      getUser(userId);
      getModules(userId);
    }

    if (moduleId && token) {
      getQuizzes(moduleId);
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
      const response = await fetch(`${API_BASE_URL}/modules?id=${id}`, {
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
        console.log("modules fetched: ", result.data, "Module decks: ");
      } else {
        console.log(response.status, response.statusText, "Error fetching modules");
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
        setDecks(result.data);
      } else {
        console.log(response.status, response.statusText, "Error fetching module decks");
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
          "Authorization": token
        }
      })

      const result = await response.json();
      if (response.ok) {
        console.log(response.status, "user quizzes fetched", result);
        setQuizzes(quizzes);
      }

      if (!response.ok) {
        console.log(response.status, "error fetching quizzes", result);
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
      } else {
        console.log("Error creating flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //

  // Prevent rendering during hydration
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
        <h1 className="mt-6 ps-3 mb-4 text-xl">Create Flashcards, Quizzes, and Papers</h1>

        <div className="flex flex-col bg-white border py-2 mx-2 rounded-md">
          <div className="bg-white px-6 w-1/2 mx-2 mt-4 rounded">
            <h3 className="mb-3 text-lg">Create Flashcards</h3>

            {/* Modules Selection */}
            <div className="flex">
              <select
                onChange={(e) => {
                  setModuleId(e.target.value)
                  getModuleDecks(e.target.value)
                }}
                className="p-2 border rounded-lg lg:w-11/12 sm:w-full me-2 pe-6"
              >
                <option value="">Select a module</option>
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
                <option value="">Select a deck</option>
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
              placeholder="Term"
              className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2 mb-2 pe-8">
              <button className="bg-white py-2 px-4 text-gray-500 border rounded hover:text-blue" onClick={createFlashcard}>
                Create Flashcard
              </button>
            </div>
            
            {/* Create quiz */}
            <h3 className="mb-3 text-lg">Create Quiz</h3>
            {/* Deck Selection */}
            <div className="flex mt-4">
              <select
                onChange={(e) => setDeckId(e.target.value)}
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
            <input
              type="text"
              placeholder="Term"
              className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2 mb-2 pe-8">
              <button className="bg-white py-2 px-4 text-gray-500 border rounded hover:text-blue" onClick={null}>
                Create Flashcard
              </button>
            </div>
          </div>

          {/* Generate with AI Section */}
          <div className="p-6 rounded-lg mt-6 mx-2">
            <div className="flex">
              <h2 className="text-lg font-regular mb-4 me-1">
                Generate from text with AI
              </h2>
              <BsStars className="mt-1 text-lg" />
            </div>
            <textarea
              className="w-full p-4 border rounded-lg bg-gray-100"
              placeholder="Add your notes here"
            ></textarea>
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-2 bg-white text-gray-500 border px-4 py-2 rounded-lg hover:bg-blue-dark transition">
                <span>Upload file</span>
              </button>
              <button className="bg-white text-gray-500 border px-4 py-2 rounded-lg hover:bg-blue-dark transition">
                Generate Flashcards
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && <DeckModal closeModal={() => setIsModalOpen(false)} moduleId={moduleId} />}
        {isModuleModalOpen && <ModuleModal closeModal={() => setIsModuleModalOpen(false)} />}
        {isQuizModalOpen && <QuizModal closeModal={() => setIsQuizModalOpen(false)} />}
      </div>
    </div>
  );
};

export default WorkSpace;
