"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { PiCardsThree } from "react-icons/pi";
import { MdOutlineGridView } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";



const FlaschardsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [deckId, setDeckId] = useState("");
  const [decks, setDecks] = useState([]);
  const [userdecks, setUserDecks] = useState([]);
  const [deckFlashcards, setDeckFlashcards] = useState([]);
  const [flashcardsetName, setFlashcardsetName] = useState("");
  const [flashcardId, setFlashcardId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyCardModal, setIsStudyCardModal] = useState(false);
  const userId = getCookie("userId");
  const token = getCookie("token");
  const router = useRouter();


  useEffect(() =>  {
    if (userId) {
      getUser(userId)
      getUserDecks(userId);
    }
    getDecks();
  }, [userId])

  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });


      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
      setEmailAddress(result.data.emailAddress);

    } catch (error) {
      console.log(error);
    }
  };

  //get all flashcards
  const getDecks = async() => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }

      const response = await fetch("http://localhost/decks", {
        method: "GET",
        headers: headers
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);
      setDecks(result.data);

    } catch (error) {
      console.log(error);
    }
  }

  //get user decks
  const getUserDecks = async(id) => {
    if (!id) {
      console.log("no user id provided");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }

      const response = await fetch(`http://localhost/user-decks?id=${id}`, {
        method: "GET",
        headers: headers
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);
      setUserDecks(result.data);
      console.log("user decks: ", result.data)

    } catch (error) {
      console.log(error);
    }
  }

  //get deck flashcards
  const getDeckFlashcards = async(id) => {
    if (!id) {
      console.log("no deck id provided");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }

      const response = await fetch(`http://localhost/deck-cards?id=${id}`, {
        method: "GET",
        headers: headers
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }

      console.log("Status:", response.status, result.message);
      setDeckFlashcards(result.data);
      console.log("user decks: ", result.data)

    } catch (error) {
      console.log(error);
    }
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

      {/* main section */}
      <div className="text-black w-screen min-h-auto border mt-16 px-6 py-2">
        <div className="flex shadow mt-4 rounded-lg">
          <div className="bg-white w-full px-4 py-4 flex flex-col gap-3">   
            <h2 className="font-semibold text-lg mb-2"> My Flashcard Groups</h2>
            {
              userdecks? userdecks.map((deck) => (
                <div
                  key={deck._id} 
                  className="block hover:cursor-pointer"
                  onClick={() => {
                    setIsStudyCardModal(true);
                    getDeckFlashcards(deck._id)
                  }}
                >
                  <div className="flex items-center min-h-[4.8em] bg-gray-100 py-1 px-3 rounded-lg hover:bg-gray-200 transition">
                    <span className="bg-black text-white px-2 py-2 rounded font-bold">
                      <PiCardsThree className="text-xl font-semibold"/>
                    </span>
                    <div key={deck._id} className="ml-4">
                      <h3 className="font-bold">{deck.title}</h3>
                      <p className="text-xs text-gray-600">
                        {deck.description} <br/>
                        {/* <button className="text-dark-blue font-semibold mt-2 flex gap-2 text-xl hover:text-blue-500">
                          <MdOutlineGridView
                              onClick={() => {
                                getDeckFlashcards(deck._id);
                                setFlashcardsetName(deck.title);
                                setDeckId(deck._id);
                              }}
                          />
                        </button> */}
                      </p>
                    </div>
                  </div>
                </div>
                )) : null
              }
            </div>

            <div className="bg-white w-full px-4 pb-4 mt-0 flex flex-col gap-3">
              <h2 className="text-black text-lg font-semibold mt-4 mb-2">Popular Flashcard Groups on NoteSage</h2>
              {
                decks ? decks.map((set) => (
                  set.public && (
                    <div
                    key={set._id} 
                    className="block hover:cursor-pointer"
                    onClick={() => {
                      setIsStudyCardModal(true);
                      getDeckFlashcards(set._id)
                    }}
                  >
                    <div className="flex items-center min-h-[4.8em] bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                      <span className="bg-black text-white px-2 py-2 rounded font-bold">
                        <PiCardsThree className="text-xl"/>
                      </span>
                      <div key={set._id} className="ml-4">
                        <h3 className="font-bold">{set.title}</h3>
                        <p className="text-xs text-gray-600">
                          {set.description}
                          <br/>
                          {/* <button className="text-dark-blue font-semibold mt-2 flex gap-2 text-xl hover:text-blue-500">
                            <MdOutlineGridView
                                onClick={() => {
                                  getDeckFlashcards(set._id);
                                  setFlashcardsetName(set.title);
                                  setDeckId(set._id);
                                }}
                            />
                          </button> */}
                        </p>
                      </div>
                    </div>
                  </div>
                  )
                )) : null
              }
            </div>
          </div>

          {/* flashcards */}
          <div className="bg-white px-4 py-2 mt-1 flex flex-col min-h-[20.2em]">
            {flashcardsetName !== "" ?  <p className="mt-4 mb-2 font-bold">{`${flashcardsetName} Flashcards`}</p> : "" }
            <div 
              className="flex flex-wrap gap-3"
              onClick={() => {
                setIsStudyCardModal(true);
                getDeckFlashcards(deckId);
              }}
            >
              { deckFlashcards ? deckFlashcards.map((card, index) => (
                index < 6 ? (
                  <div key={card._id} 
                    className="flex flex-col justify-between bg-gray-100  py-2 px-3 rounded-md h-[8em] cursor-pointer max-w-[21.68em] hover:bg-gray-200"
                  >
                    {/* flashcard col 1 */}
                    <div className="">
                      <p className="font-bold text-gray-700 mb-1 text-md">{card.front}</p>
                      <p className="text-xs text-gray-600 h-[3.7em] overflow-hidden">{card.back}</p>
                    </div>
                    {/* flashcard col 2 */}
                    <div className="flex justify-between pt-4">
                      <IoMdExpand
                        className="hover:text-blue-500 hover:text-lg"
                      />
                      {/* delete icon */}
                      <MdDeleteOutline 
                        onClick={() => {
                          setIsModalOpen(true);
                          setFlashcardId(card._id);
                        }}
                        className="text-lg text-red-500 hover:text-red-700 hover:text-xl"
                      />
                    </div>
                </div>
                ) : ""
              )) : null

              }
          </div>
          </div>
         
      </div>
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} cardId={flashcardId} token={token} onComplete={() => getDeckFlashcards(deckId)}/>}
      {isStudyCardModal && <StudyFlashcardModal closeModal={() => setIsStudyCardModal(false)} flashcards={deckFlashcards} deckTitle={flashcardsetName} />}
    </div>
  )
}

const Modal = ({ closeModal, cardId, token, onComplete} ) => {

  const handleDelete =  () => {
    deleteFlashcard(cardId);
    onComplete();
    closeModal();
  };

  // delete flashcard
  const deleteFlashcard = async(id) => {
    if (!id) {
      console.log("no card id provided");
      return;
    } 
  
    const headers = {
      "Content-Type": "application/json",
      "Authorization": token
    }
  
    try {
      const response = await fetch(`http://localhost/delete-card?id=${id}`, {
        method: "DELETE",
        headers: headers
      })
  
      const result = await response.json();
  
      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        return;
      }
  
      console.log("Status:", response.status, result.message);
    } catch(err) {
  
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this flashcard? </h2>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-400 hover:text-gray-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


const StudyFlashcardModal = ({ closeModal, flashcards, deckTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle edge case if no flashcards are provided
  if (!flashcards || flashcards.length === 0) {
    return (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[80%] flex flex-col justify-between">
          {/* Modal Header */}
          <div className="flex justify-end items-center">
            <button
              onClick={closeModal}
              className="text-black rounded-lg hover:bg-red-400 hover:text-gray-500 p-1"
            >
              <RxCross1 />
            </button>
          </div>
          <div className="flex justify-center items-center h-full text-gray-600 text-lg">
            No flashcards available.
          </div>
        </div>
      </div>
    );
  }

  // Handle "Next" button click
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFront(true);
    } else {
      setIsCompleted(true);
    }
  };

  // Handle "Previous" button click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFront(true);
    }
  };

  // Show next/previous or show completed options
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setShowFront(true);
  };

  // Toggle between front and back
  const handleCardClick = () => {
    setShowFront(!showFront);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] h-[80%] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <p className="text-xl text-white text-center w-full">{deckTitle || ""}</p>
          <button
            onClick={closeModal}
            className="text-black rounded-lg hover:bg-red-400 hover:text-gray-500 p-1"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Show Completion Message */}
        {isCompleted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-bold text-green-600 mb-4">
              You've completed all the flashcards!
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Start Over
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end items-center h-full">
            {/* Flashcard Container */}
            <div
              className="relative w-[40em h-[20em] max-w-[85%] max-h-[83%] px-20 flex justify-center items-center cursor-pointer text-xl font-semibold"
              onClick={handleCardClick}
            >
              {showFront 
                
                ? <p className="font-bold">{flashcards[currentIndex]?.front || "No term available"}</p>
                : <p className="font-normal">{flashcards[currentIndex]?.back || "No definition available"}</p>
              }
            </div>

            {/* Pagination and Navigation */}
            <div className="w-full pb-8">
              <div className="flex gap-6 justify-center items-center mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-lg ${
                    currentIndex === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-dark-blue text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <p className="text-gray-600">
                  {currentIndex + 1} / {flashcards.length}
                </p>
                <button
                  onClick={handleNext}
                  className="bg-dark-blue text-white px-8 py-2 rounded-lg hover:bg-blue-600"
                >
                  {currentIndex === flashcards.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default FlaschardsPage;