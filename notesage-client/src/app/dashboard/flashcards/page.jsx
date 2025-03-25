"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/util/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { PiCardsThree } from "react-icons/pi";


const FlaschardsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [decks, setDecks] = useState([]);
  const [userdecks, setUserDecks] = useState([]);
  const [deckFlashcards, setDeckFlashcards] = useState([]);
  const [flashcardsetName, setFlashcardsetName] = useState([]);
  const userId = getCookie("userId");
  const token = getCookie("token");


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
      <div className="text-black w-screen min-h-auto border mt-16 px-2 py-2">
        <div className="flex gap-0.5">
          <div className="bg-white w-full px-4 py-4 mt-4 flex flex-col gap-3">   
            <p className="font-bold"> My Flashcard Groups</p>
            {
              userdecks? userdecks.map((deck) => (
                <div
                  key={deck._id} 
                  className="block hover:cursor-pointer"
                  onClick={() => {
                    getDeckFlashcards(deck._id);
                    setFlashcardsetName(deck.title);
                  }}
                >
                  <div className="flex items-center min-h-[4.8em] bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                    <span className="bg-dark-blue text-white px-2 py-1 rounded font-bold">
                      <PiCardsThree className="text-xl font-semibold"/>
                    </span>
                    <div key={deck._id} className="ml-4">
                      <h3 className="font-semibold">{deck.title}</h3>
                      <p className="text-sm text-gray-600">
                        {deck.description}
                      </p>
                    </div>
                  </div>
                </div>
                )) : null
              }
            </div>

            <div className="bg-white w-full px-4 pb-4 mt-4 flex flex-col gap-3">
              <p className="text-black font-bold mt-4 mb-2">Popular Flashcard Groups on NoteSage</p>
              {
                decks ? decks.map((set) => (
                  set.public && (
                    <div
                    key={set._id} 
                    className="block hover:cursor-pointer"
                  >
                    <div className="flex items-center min-h-[4.8em] bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                      <span className="bg-dark-blue text-white px-2 py-1 rounded font-bold">
                        <PiCardsThree className="text-xl font-semibold"/>
                      </span>
                      <div key={set._id} className="ml-4">
                        <h3 className="font-semibold">{set.title}</h3>
                        <p className="text-sm text-gray-600">
                          {set.description}
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
            <div className="flex flex-wrap gap-3">
              { deckFlashcards ? deckFlashcards.map((card, index) => (
                index < 6 ? (
                  <div className="flex flex-col justify-between bg-gray-100 shadow py-2 px-3 rounded-md h-[8em] cursor-pointer max-w-[21.68em] hover:bg-gray-200">
                    {/* flashcard col 1 */}
                    <div className="">
                      <p className="font-bold text-gray-700 mb-1 text-md">{card.front}</p>
                      <p className="text-xs text-gray-600 h-[3.7em] overflow-hidden">{card.back}</p>
                    </div>
                    {/* flashcard col 2 */}
                    <div className="flex justify-between pt-4">
                      <Link href="#"> <IoMdExpand/></Link>
                      <Link href="#"> <MdDeleteOutline className="text-lg text-red-500 hover:text-red-700"/></Link>
                    </div>
                </div>
                ) : ""
              )) : null

              }
          </div>
          </div>
         
      </div>
    </div>
  )
}

export default FlaschardsPage;