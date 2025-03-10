"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/sidebar";
import { CiSquarePlus } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import DeckModal from "../components/DeckModal";
import ModuleModal from "../components/ModuleModal";

const WorkSpace = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLasttname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);

  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState("");
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");

  const [decks, setDecks] = useState([]);

  const userId = Cookies.get("user-id");
  const token = Cookies.get("auth-token");

  /*----API CALLS-------------------------------------------------------------*/
  const getUser = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFirstname(result.data.firstName);
        setLasttname(result.data.lastName);
        setEmailAddress(result.data.emailAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getModules = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost/modules?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setModules(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getModuleDecks = async (id) => {
    if (!id) {
      console.log("User id not found. Unable to get modules.");
      return;
    }

    try {
      const response = await fetch(`http://localhost/module-decks?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDecks(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
      getModules(userId);
    }
  }, [userId]);

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

        <div className="flex bg-white border py-2 mx-2 rounded-md">
          <div className="bg-white px-6 w-1/2 mx-2 mt-4 rounded">
            <h3 className="mb-3 text-lg">Create Flashcards</h3>

            {/* Modules Selection */}
            <div className="flex">
              <select
                onChange={(e) => {
                  const selectedModuleId = e.target.value;
                  setModuleId(selectedModuleId);
                  getModuleDecks(selectedModuleId);
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
              <select className="p-2 border rounded-lg lg:w-11/12 sm:w-full me-2 pe-16">
                <option value="">Select a deck</option>
                {decks.map((deck) => (
                  <option key={deck._id} value={deck._id}>
                    {deck.title}
                  </option>
                ))}
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
            />
            <textarea
              name="back"
              placeholder="Content"
              className="mt-4 p-2 border lg:w-11/12 sm:w-full rounded-md"
            ></textarea>
            <div className="flex justify-end mt-2 mb-2 -ms-6 w-full pe-8">
              <button className="bg-white py-2 px-4 text-gray-500 border rounded hover:text-blue" onClick={createFlashcard}>Create Flashcard</button>
            </div>
          </div>
        </div>

        {/* Deck Modal */}
        {isModalOpen && (
          <DeckModal 
            closeModal={() => setIsModalOpen(false)} 
            moduleId={moduleId} 
          />
        )}

        {/* Module Modal */}
        {isModuleModalOpen && (
          <ModuleModal 
            closeModal={() => setIsModuleModalOpen(false)} 
          />
        )}

        {/* Generate with AI Section */}
        <div className="bg-white p-6 rounded-lg mt-6 mx-2 shadow">
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
    </div>
  );
};

export default WorkSpace;
