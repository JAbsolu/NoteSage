"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/util/cookies";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { IoMdExpand } from "react-icons/io";
import { PiCardsThree } from "react-icons/pi";
import { FiMoreHorizontal } from "react-icons/fi";
import StudyFlashcardModal from "@/components/studyFlashCardModal";
import DeletionConfirmationModal from "@/components/DeletionConfirmationModal";
import { Suspense } from "react";


export default function FlashCardPageSuspense() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FlashcardsPage />
      </Suspense>
    </div>
  );
}

const FlashcardsPage = () => {
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
  const [defaultFlashCardMessage, setHideDefaultFlashcardMessage] = useState(false);
  const [activeDropdownCardId, setActiveDropdownCardId] = useState(null);

  const userId = getCookie("userId");
  const token = getCookie("token");
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id"); 

  const API_URL = process.env.API_URL || "http://localhost:/5000";

  const getUser = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      const result = await response.json();
      if (!response.ok) return;
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
      setEmailAddress(result.data.emailAddress);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getDecks = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/decks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      const result = await response.json();
      if (!response.ok) return;
      setDecks(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getUserDecks = useCallback(async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${API_URL}/user-decks?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      const result = await response.json();
      if (!response.ok) return;
      setUserDecks(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getDeckFlashcards = async (id) => {
    if (!id) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      };
      const response = await fetch(`${API_URL}/deck-cards?id=${id}`, {
        method: "GET",
        headers
      });

      const result = await response.json();
      if (!response.ok) return;
      setDeckFlashcards(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
      getUserDecks(userId);
    }
    getDecks();
  }, [userId, getUser, getUserDecks, getDecks]);

  useEffect(() => {
    if (paramId) {
      getDeckFlashcards(paramId);
      setIsStudyCardModal(true);
    }
  },[paramId])

  return (
    <div className="flex bg-light-gray min-h-screen">
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
            <h2 className="font-semibold text-lg mb-2">My Flashcard Groups</h2>
            {userdecks && userdecks.map((deck) => (
              <div
                key={deck._id}
                className="block hover:cursor-pointer"
                onClick={() => {
                  setIsStudyCardModal(true);
                  getDeckFlashcards(deck._id);
                  setFlashcardsetName(deck.title);
                  setDeckId(deck._id);
                }}
              >
                <div className="flex items-center min-h-[4.8em] bg-gray-100 py-1 px-3 rounded-lg hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-2 py-2 rounded font-bold">
                    <PiCardsThree className="text-xl font-semibold" />
                  </span>
                  <div className="ml-4">
                    <h3 className="font-bold">{deck.title}</h3>
                    <p className="text-xs text-gray-600">{deck.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white w-full px-4 pb-4 mt-0 flex flex-col gap-3">
            <h2 className="text-black text-lg font-semibold mt-4 mb-2">Popular Flashcard Groups on NoteSage</h2>
            {decks && decks.map((set) => (
              set.public && (
                <div
                  key={set._id}
                  className="block hover:cursor-pointer"
                  onClick={() => {
                    setIsStudyCardModal(true);
                    getDeckFlashcards(set._id);
                    setFlashcardsetName(set.title);
                    setDeckId(set._id);
                  }}
                >
                  <div className="flex items-center min-h-[4.8em] bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                    <span className="bg-black text-white px-2 py-2 rounded font-bold">
                      <PiCardsThree className="text-xl" />
                    </span>
                    <div className="ml-4">
                      <h3 className="font-bold">{set.title}</h3>
                      <p className="text-xs text-gray-600">{set.description}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Flashcards Section */}
        <div className="bg-white px-4 py-2 mt-1 flex flex-col min-h-[20.2em]">
          {flashcardsetName && (
            <p className="mt-4 mb-2 font-bold">{`${flashcardsetName} Flashcards`}</p>
          )}
          <div
            className="flex flex-wrap gap-3"
            onClick={() => {
              getDeckFlashcards(deckId);
              setIsStudyCardModal(true);
              setHideDefaultFlashcardMessage(true);
            }}
          >
            {deckFlashcards && deckFlashcards.map((card) => (
              <div
                key={card._id}
                className="flex flex-col justify-between bg-gray-100 py-2 px-3 h-[8em] cursor-pointer w-full hover:bg-gray-200"
              >
                <div>
                  <p className="font-bold text-gray-700 mb-1 text-md">{card.front}</p>
                  <p className="text-xs text-gray-600 h-[3.7em] overflow-hidden">{card.back}</p>
                </div>

                <div className="flex justify-between pt-4 relative">
                  <IoMdExpand className="hover:text-blue-500 hover:text-lg" />

                  {/* Related actions dropdown */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownCardId(activeDropdownCardId === card._id ? null : card._id);
                        setFlashcardId(card._id);
                      }}
                      className="p-1 hover:bg-gray-300 rounded-full"
                    >
                      <FiMoreHorizontal size={18} />
                    </button>

                    {activeDropdownCardId === card._id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg z-20 text-black">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                            setActiveDropdownCardId(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {deckFlashcards.length === 0 && (
              <div className="h-[35em] text-gray-500 p-4 italic border-2 border-dashed w-full">
                <p className="text-black">Select a flashcard set to view flashcards.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <DeletionConfirmationModal
          closeModal={() => {
            setIsModalOpen(false);
            setFlashcardId("");
          }}
          cardId={flashcardId}
          token={token}
          onComplete={() => getDeckFlashcards(deckId)}
        />
      )}

      {isStudyCardModal && (
        <StudyFlashcardModal
          closeModal={() => setIsStudyCardModal(false)}
          flashcards={deckFlashcards}
          deckTitle={flashcardsetName}
        />
      )}
    </div>
  );
};
