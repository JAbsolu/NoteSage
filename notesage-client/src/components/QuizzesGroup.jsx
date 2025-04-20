import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineQuiz } from "react-icons/md";

const API_URL = process.env.API_URL || "http://localhost";

const QuizzesGroup = ({quizzes, firstName, moduleId }) => {
  const token = getCookie("token");
  const [quizId, setQuizId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const getQuizzes = useCallback(async(id) => {

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    }

    try {
      const response = await fetch(`${API_URL}/module-quizzes?id=${id}`, {
        method: "GET",
        headers: headers
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
  },[token])

  //delete quiz
  const deleteQuiz = async(id) => {
    if (!id) {
      console.log("no quiz id provided");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }

      const response = await fetch(`${API_URL}/delete-quiz?id=${id}`, {
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

  useEffect(() => {
    if (moduleId && token) {
      getQuizzes(moduleId);
    }
  }, [moduleId, token, getQuizzes])

  return (
    <>
      {quizzes && quizzes.length > 0 ? <h3 className="font-semibold text-lg mt-8 mb-3">Quizzes</h3> : null }
      <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll">
        {quizzes ? quizzes.map((quiz) => (
          <div key={quiz._id} className="hover:cursor-pointer min-w-[95%]">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
              <span className="bg-black text-white px-3 py-3 rounded font-bold"><MdOutlineQuiz className="text-lg"/></span>
              <div key={quiz._id} className="ml-4 w-full">
                <h3 className="font-semibold">{quiz.title}</h3>
                <p className="text-sm text-gray-600">
                  <span className="text-xs"> created by {firstName}</span>
                </p>
              </div>
              {/* actions */}
              <div className="flex w-full justify-end items-end gap-3 w-full">
                <span
                  className="flex flex-col gap-1 hover:text-[#2489D3] hover:cursor-pointer text-xs" 
                  onClick={() => {
                    setQuizId(quiz._id);
                    setTitle(quiz.title);
                    setDescription(quiz.description);
                    setModalOpen(true);
                  }}
                > 
                  <FaRegEdit className="text-lg" /> 
                </span>
                <span 
                  className="flex gap-1 hover:text-red-600 hover:cursor-pointer text-xs"
                  onClick={() => {
                    deleteQuiz(quiz._id);
                    getQuizzes(moduleId);
                  }}
                > 
                  <RxCross1 className="text-lg" /> 
                </span>
              </div>
            </div>
          </div> )) : null
        }
      </div>
     {modalOpen && <Modal closeModal={() => setModalOpen(false)} quizId={quizId} token={token} title={title} description={description} onUpdateComplete={() => getQuizzes(moduleId) } />}
    </>
  )
}

const Modal = ({ closeModal, quizId, token, title, description, onUpdateComplete}) => {
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const update = async () => {
    await updateQuiz(quizId);
    onUpdateComplete();
    closeModal();
  };

  const updateQuiz = async (id) => {

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    }

    const body = {
      title: newTitle || title,
      description: newDescription || description
    }

    try {
      const response = await fetch(`${API_URL}/update-quiz?id=${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.error);
      }

      console.log("Status:", response.status, result.message, result.update);

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close on background click
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Quiz</h2>

        <input
          type="text"
          placeholder="Enter quiz title..."
          value={newTitle || title}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Add a description..."
          value={newDescription || description}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        ></textarea>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal} // Proper function call
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={update}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );

}

export default QuizzesGroup;