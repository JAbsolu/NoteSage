"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiSearch, FiSettings, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "../util/cookies";

const DashboardNavbar = ({ toggleSidebar, firstName, lastName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [decks, setDecks] = useState([]);
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const token = getCookie("token");

  const router = useRouter();

  const handleSignOut = () => {
    deleteCookie("token");
    deleteCookie("user");
    router.push("/login");
  };

  useEffect(() => {
    // Fetch all data on mount
    Promise.all([
      fetch("http://localhost/decks", { headers: { Authorization: token } }).then(res => res.json()),
      // fetch("http://localhost/modules", { headers: { Authorization: token } }).then(res => res.json()),
      fetch("http://localhost/quizzes", { headers: { Authorization: token } }).then(res => res.json()),
    ])
      .then(([decksData, modulesData, quizzesData]) => {
        setDecks(decksData?.data || []);
        setModules(modulesData?.data || []);
        setQuizzes(quizzesData?.data || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);

  const term = searchTerm.toLowerCase();

  const filteredDecks = decks.filter(
    (item) =>
      item.title?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
  );

  const filteredModules = modules.filter(
    (item) =>
      item.title?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
  );

  const filteredQuizzes = quizzes.filter(
    (item) =>
      item.title?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
  );

  return (
    <>
    <nav className="bg-white px-6 py-4 flex flex-col md:flex-row md:justify-between items-start md:items-center fixed top-0 left-0 w-full z-50">
      {/* Top Row */}
      <div className="flex items-center space-x-4 w-full justify-between md:w-auto">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-blue text-2xl">
            <FiMenu />
          </button>
          <h2 className="text-xl font-semibold text-black">NoteSage</h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full mt-4 md:mt-0 md:max-w-md">
        <input
          type="text"
          placeholder="Search Notesage"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 px-10 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
         {/* Search Results */}
     {searchTerm && (
        <div className="bg-gray-100 fixed margin-center top-10  shadow-lg rounded-lg mt-4 p-4 w-[30.5em] mx-auto">
          {filteredModules.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-600 mb-1">Lesson Groups</h3>
              {filteredModules.map((mod) => (
                <div key={mod._id} className="text-gray-800">{mod.title}</div>
              ))}
            </div>
          )}
          {filteredDecks.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-green-600 mb-1">Flashcard Sets</h3>
              {filteredDecks.map((deck) => (
                <div key={deck._id} className="text-gray-800">{deck.title}</div>
              ))}
            </div>
          )}
          {filteredQuizzes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-purple-600 mb-1">Quizzes</h3>
              {filteredQuizzes.map((quiz) => (
                <div key={quiz._id} className="text-gray-800">{quiz.title}</div>
              ))}
            </div>
          )}
          {filteredDecks.length + filteredModules.length + filteredQuizzes.length === 0 && (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      )}
      </div>
       {/* Profile */}
       <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold"
          >
            {`${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              <div className="px-4 py-2 text-gray-700 font-semibold border-b">
                {`${firstName} ${lastName}`}
              </div>
              <Link
                href="/dashboard/setting"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <FiSettings className="mr-2" />
                Settings
              </Link>
              <button
                className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleSignOut}
              >
                <FiLogOut className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
    </nav>
     {/* Search Results */}
     {/* {searchTerm && (
        <div className="bg-gray-100 ms-40 fixed margin-center top-16 -mt-2 shadow-lg rounded-lg mt-4 p-4 w-[50%] max-w-3xl mx-auto">
          {filteredModules.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-600 mb-1">Lesson Groups</h3>
              {filteredModules.map((mod) => (
                <div key={mod._id} className="text-gray-800">{mod.title}</div>
              ))}
            </div>
          )}
          {filteredDecks.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-green-600 mb-1">Flashcard Sets</h3>
              {filteredDecks.map((deck) => (
                <div key={deck._id} className="text-gray-800">{deck.title}</div>
              ))}
            </div>
          )}
          {filteredQuizzes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-purple-600 mb-1">Quizzes</h3>
              {filteredQuizzes.map((quiz) => (
                <div key={quiz._id} className="text-gray-800">{quiz.title}</div>
              ))}
            </div>
          )}
          {filteredDecks.length + filteredModules.length + filteredQuizzes.length === 0 && (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      )} */}
    </>
  );
};

export default DashboardNavbar;
