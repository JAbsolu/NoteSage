import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import FlashcardSets from "./FlashcardSets";
import QuizzesGroup from "./QuizzesGroup";
import { FaRegEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaBook } from "react-icons/fa";

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
  const [errors, setErrors] = useState({});
  

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
        console.log("module decks:", result)
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

  //delete module
  const deleteModule = async(id) => {
    if (!id) {
      console.log("id is required");
      setErrors(prev => ({
        ...prev,
        error: "unable to delete lesson group, id error"
      }))
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    }

    try {
      const response = await fetch(`http://localhost/delete-module?id=${id}`, {
        method: "DELETE",
        headers: headers,
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);

    } catch(error) {
     console.log(error);
    }
  }

  return (
    <>
      <h3 className="font-semibold text-lg mt-4 mb-5">Lesson Groups</h3>
      <div className="flex flex-col justify-between gap-3 overflow-scroll">
      {modules.map((module) => (
        <div
          key={module._id} 
          onClick={() => { 
            getModuleDecks(module._id);
            getQuizzes(module._id);
            setLessonGroupId(module._id);
          }} 
          className="hover:cursor-pointer min-w-[33em] max-w-[95%]"
        >
          <div className="flex bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
            <div className="flex justify-center items-center">
              <span className="bg-dark-blue text-white px-2 py-2 rounded font-bold"><FaBook className="text-lg"/></span>
              <div key={module._id} className="ml-4 min-w-[25em]">
                <h3 className="font-bold">{module.title}</h3>
                <p className="text-xs text-gray-600">
                  <span className="text-md"> created by {firstName}</span>
                </p>
              </div>
            </div>
           {/* actions */}
            <div className="flex w-full justify-end items-end gap-3">
              <span
                className="flex flex-col gap-1 hover:text-[#2489D3] hover:cursor-pointer text-xs" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent onClick
                  setIsModalOpen(true);
                  setModuleTitle(module.title);
                  setIsSetPublic(module.public);
                }}
              > 
                <FaRegEdit className="text-lg" /> 
              </span>
              <span 
                className="flex gap-1 hover:text-red-600 hover:cursor-pointer text-xs"
                onClick={(e) => {
                  e.stopPropagation(); 
                  deleteModule(module._id);
                  getModules(userId)
                }}
              > 
                <RxCross1 className="text-lg" /> 
              </span>
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
