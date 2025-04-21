"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import TakeQuizModal from "@/components/TakeQuizModal";
import { getCookie } from "@/util/cookies";
import { useCallback, useEffect, useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { PiCardsThree } from "react-icons/pi";
import { FiMoreHorizontal } from "react-icons/fi";

const API_URL = process.env.API_URL || "http://localhost:/5000";

const QuizzesPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModal, setIsQuizModal] = useState(false);
  const [activeDropdownQuestionId, setActiveDropdownQuestionId] = useState(null);

  const userId = getCookie("userId");
  const token = getCookie("token");

  const getUser = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
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
  }, [token]);

  const getQuizzes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();
      if (!response.ok) return;

      setQuizzes(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getUserQuizzes = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/user-quizzes?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();
      if (!response.ok) return;

      setUserQuizzes(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getQuizQuestions = useCallback(async (quizId) => {
    try {
      const response = await fetch(`${API_URL}/quiz-choices?id=${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();
      if (!response.ok) return;

      setQuizQuestions(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const deleteQuestion = async(id) => {
    try {
      const response = await fetch(`${API_URL}/delete-multiplechoice?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": token }
      })

      const result = await response.json();

      if (!response.ok) return;
      getQuizQuestions(quizId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userId) getUser(userId);
  }, [userId, getUser]);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  useEffect(() => {
    if (userId) getUserQuizzes(userId);
  }, [userId, getUserQuizzes]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
      />
      <Sidebar isExpanded={sidebarExpanded} />

      <div className="text-black w-screen min-h-auto border mt-16 px-6 py-2">
        <div className="flex shadow mt-4 rounded-lg">
          <div className="bg-white w-full px-4 py-4 flex flex-col gap-3">
            <h2 className="font-semibold text-lg mb-2">My Quizzes</h2>
            {userQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="block hover:cursor-pointer"
                onClick={() => {
                  setIsQuizModal(true);
                  getQuizQuestions(quiz._id);
                  setQuizTitle(quiz.title);
                  setQuizId(quiz._id);
                }}
              >
                <div className="flex items-center min-h-[4.8em] bg-gray-100 py-1 px-3 rounded-lg hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-2 py-2 rounded font-bold">
                    <PiCardsThree className="text-xl font-semibold" />
                  </span>
                  <div className="ml-4">
                    <h3 className="font-bold">{quiz.title}</h3>
                    <p className="text-xs text-gray-600">{quiz.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white w-full px-4 pb-4 mt-0 flex flex-col gap-3">
            <h2 className="text-black text-lg font-semibold mt-4 mb-2">Quizzes on NoteSage</h2>
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="block hover:cursor-pointer"
                onClick={() => {
                  setIsQuizModal(true);
                  getQuizQuestions(quiz._id);
                  setQuizTitle(quiz.title);
                  setQuizId(quiz._id);
                }}
              >
                <div className="flex items-center min-h-[4.8em] bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-2 py-2 rounded font-bold">
                    <PiCardsThree className="text-xl" />
                  </span>
                  <div className="ml-4">
                    <h3 className="font-bold">{quiz.title}</h3>
                    <p className="text-xs text-gray-600">{quiz.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Questions Preview */}
        <div className="bg-white px-4 py-2 mt-1 flex flex-col min-h-[20.2em]">
          <div
            className="flex flex-wrap gap-3"
            onClick={() => {
              setIsQuizModal(true);
              getQuizQuestions(quizId);
            }}
          >
            {quizQuestions.slice(0, 6).map((question) => (
              <div
                key={question._id}
                className="flex justify-between bg-gray-100 py-2 px-3 cursor-pointer w-full hover:bg-gray-200"
              >
                <div>
                  <p className="font-bold text-gray-700 mb-1 text-md">{question.question}</p>
                  <p className="text-xs text-gray-600 h-[3.7em] overflow-hidden">{question.choices["A"]}</p>
                </div>

                {/* Related Actions Dropdown */}
                <div className="pt-4 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdownQuestionId(
                        activeDropdownQuestionId === question._id ? null : question._id
                      );
                    }}
                    className="p-1 hover:bg-gray-300 rounded-full"
                  >
                    <FiMoreHorizontal size={18} />
                  </button>

                  {activeDropdownQuestionId === question._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg z-20 text-black">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                          setActiveDropdownQuestionId(null);
                          deleteQuestion(question._id)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {quizQuestions.length === 0 && (
              <div className="h-[35em] text-gray-500 p-4 italic border-2 border-dashed w-full">
                <p className="text-black">Select a quiz to view questions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isQuizModal && (
        <TakeQuizModal
          closeModal={() => setIsQuizModal(false)}
          questions={quizQuestions}
          quizTitle={quizTitle}
        />
      )}
    </div>
  );
};

export default QuizzesPage;
