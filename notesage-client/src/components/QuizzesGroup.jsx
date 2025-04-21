import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";

const API_URL = process.env.API_URL || "http://localhost:/5000";

const QuizzesGroup = ({ quizzes, firstName, moduleId }) => {
  const token = getCookie("token");

  const [quizId, setQuizId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getQuizzes = useCallback(
    async (id) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      try {
        const response = await fetch(`${API_URL}/module-quizzes?id=${id}`, {
          method: "GET",
          headers: headers,
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
    },
    [token]
  );

  const deleteQuiz = async (id) => {
    if (!id) {
      console.log("no quiz id provided");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await fetch(`${API_URL}/delete-quiz?id=${id}`, {
        method: "DELETE",
        headers: headers,
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
      }

      console.log("Status:", response.status, result.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (moduleId && token) {
      getQuizzes(moduleId);
    }
  }, [moduleId, token, getQuizzes]);

  return (
    <>
      {quizzes && quizzes.length > 0 ? (
        <h3 className="font-semibold text-lg mt-8 mb-3">Quizzes</h3>
      ) : null}
      <div className="flex flex-wrap gap-4 w-full">
        {quizzes
          ? quizzes.map((quiz) => (
              <div key={quiz._id} className="hover:cursor-pointer min-w-[95%]">
                <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition justify-between">
                  <div className="flex items-center">
                    <span className="bg-black text-white px-3 py-3 rounded font-bold">
                      <MdOutlineQuiz className="text-lg" />
                    </span>
                    <div className="ml-4">
                      <h3 className="font-semibold">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="text-xs"> created by {firstName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Related actions dropdown */}
                  <div className="relative text-black">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === quiz._id ? null : quiz._id);
                        setQuizId(quiz._id);
                        setTitle(quiz.title);
                        setDescription(quiz.description);
                      }}
                      className="p-2 hover:bg-gray-300 rounded-full"
                    >
                      <FiMoreHorizontal size={18} className="text-black"/>
                    </button>

                    {activeDropdown === quiz._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 text-black">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalOpen(true);
                            setActiveDropdown(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteQuiz(quiz._id);
                            getQuizzes(moduleId);
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
            ))
          : null}
      </div>

      {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          quizId={quizId}
          token={token}
          title={title}
          description={description}
          onUpdateComplete={() => {
            getQuizzes(moduleId);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

const Modal = ({ closeModal, quizId, token, title, description, onUpdateComplete }) => {
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const update = async () => {
    await updateQuiz(quizId);
    onUpdateComplete();
  };

  const updateQuiz = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const body = {
      title: newTitle || title,
      description: newDescription || description,
    };

    try {
      const response = await fetch(`${API_URL}/update-quiz?id=${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.error);
      }

      console.log("Status:", response.status, result.message, result.update);
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
        <h2 className="text-lg font-semibold mb-4">Update Quiz</h2>

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

export default QuizzesGroup;
