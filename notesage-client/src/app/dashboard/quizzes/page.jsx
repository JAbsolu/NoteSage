"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import TakeQuizModal from "@/components/TakeQuizModal";
import { getCookie } from "@/util/cookies";
import { useCallback, useEffect, useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { PiCardsThree } from "react-icons/pi";

const API_URL = process.env.API_URL || "http://localhost";

const QuizzesPage = () => {
  // ---------------------- State Declarations ---------------------- //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [quizId, setQuizId] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModal, setIsQuizModal] = useState(false);

  // Get token and userId from cookies
  const userId = getCookie("userId");
  const token = getCookie("token");

  // ---------------------- API Calls ---------------------- //
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
  },[token]);

  // get quizzes
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

      if (!response.ok) {
        console.log(response.status, response.statusText, result.message);
        return;
      }

      console.log(response.status, response.statusText, result.message, result.data);
      setQuizzes(result.data);

    } catch (error) {
      console.log(error);
    }
  },[token])

  //get userQuizzes
  const getUserQuizzes = useCallback( async (id) => {
    try {
      const response = await fetch(`${API_URL}/user-quizzes?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(response.status, response.statusText, result.message);
        return;
      }

      console.log(response.status, response.statusText, result.message, result.data);
      setUserQuizzes(result.data);

    } catch (error) {
    }
  },[token])


  // get quiz questions
  const getQuizQuestions = useCallback(async (quizId) => {
    const url = `${API_URL}/quiz-choices?id=${quizId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      const result = await response.json();

      if (!response.ok) {
        console.log(response.status, result,message);
        return;
      }

      setQuizQuestions(result.data);
      console.log(response.status, result.message, result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token])


  // ---------------------- useEffect ---------------------- //
  useEffect(() => {
    getUser(userId);
  }, [userId, getUser]);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  useEffect(() => {
    if (userId) {
      getUserQuizzes(userId);
    }
  }, [userId, getUserQuizzes]);
  


  // ---------------------- Component JSX ---------------------- //
  return (
    <div className=" flex min-h-screen bg-gray-50">
      {/* Navbar and Sidebar */}
      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
      />
      <Sidebar isExpanded={sidebarExpanded} />

      {/* Main Section */}
      <div className="text-black w-screen min-h-auto border mt-16 px-6 py-2">
        <div className="flex shadow mt-4 rounded-lg">
          <div className="bg-white w-full px-4 py-4 flex flex-col gap-3">
            <h2 className="font-semibold text-lg mb-2">My Quizzes</h2>

            {/* User Quizzes List */}
            {userQuizzes?.map((quiz) => (
              <div
                key={quiz._id}
                className="block hover:cursor-pointer"
                onClick={() => {
                  setIsQuizModal(true);
                  getQuizQuestions(quiz._id);
                  setQuizTitle(quiz.title)
                }}
              >
                <div className="flex items-center min-h-[4.8em] bg-gray-100 py-1 px-3 rounded-lg hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-2 py-2 rounded font-bold">
                    <PiCardsThree className="text-xl font-semibold" />
                  </span>
                  <div className="ml-4">
                    <h3 className="font-bold">{quiz.title}</h3>
                    <p className="text-xs text-gray-600">
                      {quiz.description}
                      <br />
                      {/* <button className="text-dark-blue font-semibold mt-2 flex gap-2 text-xl hover:text-blue-500">
                        <MdOutlineGridView ... />
                      </button> */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Public Quizzes on NoteSage */}
          <div className="bg-white w-full px-4 pb-4 mt-0 flex flex-col gap-3">
            <h2 className="text-black text-lg font-semibold mt-4 mb-2">Quizzes on NoteSage</h2>
            {quizzes?.map(
              (quiz) =>
                // quiz.public && (
                  <div
                    key={quiz._id}
                    className="block hover:cursor-pointer"
                    onClick={() => {
                      setIsQuizModal(true);
                      getQuizQuestions(quiz._id);
                    }}
                  >
                    <div className="flex items-center min-h-[4.8em] bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                      <span className="bg-black text-white px-2 py-2 rounded font-bold">
                        <PiCardsThree className="text-xl" />
                      </span>
                      <div className="ml-4">
                        <h3 className="font-bold">{quiz.title}</h3>
                        <p className="text-xs text-gray-600">
                          {quiz.description}
                          <br />
                          {/* <button className="text-dark-blue font-semibold mt-2 flex gap-2 text-xl hover:text-blue-500">
                            <MdOutlineGridView ... />
                          </button> */}
                        </p>
                      </div>
                    </div>
                  </div>
                // )
            )}
          </div>
        </div>

        {/* quizzes Preview Section */}
        <div className="bg-white px-4 py-2 mt-1 flex flex-col min-h-[20.2em]">
          <div
            className="flex flex-wrap gap-3"
            onClick={() => {
              setIsQuizModal(true);
              getQuizQuestions(quizId);
            }}
          >
            {quizQuestions?.slice(0, 6).map((question) => (
              <div
                key={question._id}
                className="flex justify-between bg-gray-100 py-2 px-3 cursor-pointer w-full hover:bg-gray-200"
              >
                {/* Quiz and answer*/}
                <div>
                  <p className="font-bold text-gray-700 mb-1 text-md">{question.question}</p>
                  <p className="text-xs text-gray-600 h-[3.7em] overflow-hidden">{question.choices["A"]}</p>
                </div>
                {/* Flashcard actions */}
                <div className="pt-4">
                  <MdDeleteOutline
                    onClick={() => {
                      setIsModalOpen(true);
                      setFlashcardId(question._id);
                    }}
                    className="text-lg text-red-500 hover:text-red-700 hover:text-xl"
                  />
                </div>
              </div>
            ))}
            {quizQuestions.length === 0 && (
              <div className="h-[35em] text-gray-500 p-4 italic border-2 border-dashed w-full">
                <p className="text-black">Select a quizz to view questions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* {isModalOpen && <Modal closeModal={...} />} */}
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