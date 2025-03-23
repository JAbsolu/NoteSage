import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import FlashcardSets from "./FlashcardSets";
import QuizzesGroup from "./QuizzesGroup";

// API Base URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";

const LessonGroups = ({ firstName }) => {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const [modules, setModules] = useState([]);
  const [decks, setDecks] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonGroupId, setLessonGroupId] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [isSetPublic, setIsSetPublic] = useState(false);
  

  useEffect(() => {
    if (userId && token) {
      getModules(userId);
    }
  }, [userId, token]);

  // Fetch decks based on the selected module
  const getModuleDecks = async (id) => {
    if (!id) {
      console.log("No module selected.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/module-decks?id=${id}`, {
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
        console.log("Status:", response.status, result.message);
        setQuizzes(quizzes);
      }

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

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

      const result = await response.json();
       
      if (response.ok) {
        setModules(result.data);
        console.log("Status:", response.status, result.message);
      } else {
        console.log("Status:", response.status, result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="font-bold text-lg mt-4 mb-3 ps-10">Lesson Groups</h3>
      <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll ps-10">
        {modules.map((module, index) => (
          <div key={index} 
            href="#" 
            onClick={() => { 
              getModuleDecks(module._id);
              getQuizzes(module._id);
              setLessonGroupId(module._id);
            }} 
            className="block"
          >
            <div className="flex flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
              <span className="bg-black text-white px-2 py-1 rounded font-bold">LG</span>
              <div className="ml-4">
                <h3 className="font-bold">{module.title}</h3>
                <p className="text-sm text-gray-600">{modules.length} total items - <span className="text-xs"> created by {firstName}</span></p>
              </div>
              <div className="flex justify-center items-center gap-4 ms-4">
                <span className="flex gap-2 hover:text-[#2489D3] hover:cursor-pointer" 
                  onClick={() => { 
                    setIsModalOpen(true);
                    setModuleTitle(module.title);
                    setIsSetPublic(module.public);
                  }}
                > 
                  Update
                  <FaRegEdit className="text-xl" /> 
                </span>
                <span className="flex gap-2 hover:text-[#2489D3]  hover:cursor-pointer"> Delete<FiDelete className="text-xl" /> </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FlashcardSets decks={decks} firstName={firstName} moduleId={lessonGroupId}/>
      <QuizzesGroup quizzes={quizzes} firstName={firstName} moduleId={lessonGroupId}/>
      {/* modal to edit modules/lesson groups */}
      {isModalOpen && <Modal 
        closeModal={() => setIsModalOpen(false)}
        lessonGroupId={lessonGroupId}
        title={moduleTitle}
        isSetPublicublic={isSetPublic}
        token={token}
        onUpdateComplete={() => getModules(userId)}
      />}
    </>
  )
}

// Modal to edit
const Modal = ({ closeModal, lessonGroupId, title, isSetPublic, token, onUpdateComplete }) => {
  const [isPublic, setIsPublic] = useState(false); 
  const [newLessonGroupName, setNewLessonGroupName] = useState("");

  const update = async () => {
    await updateModule(lessonGroupId);
    onUpdateComplete();
    closeModal();
  };

  const updateModule = async(id) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    };

    const body = {
      title: newLessonGroupName || title,
      public: isPublic || isSetPublic
    };

    try {
      const response = await fetch(`${API_BASE_URL}/update-module?id=${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Status:", response.status , result.message);
      } else {
        console.log("Status:", response.status , result.message);
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
        <h2 className="text-lg font-semibold mb-4">Update Lesson Group</h2>

        <input
          type="text"
          placeholder="Enter module title..."
          value={newLessonGroupName || title}
          onChange={(e) => setNewLessonGroupName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        
        <span className="flex gap-4">
          <label className="block mt-4 text-sm">Public</label>
          <input type="checkbox" className="mt-4" onChange={() => setIsPublic(!isPublic)} />
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

export default LessonGroups;
