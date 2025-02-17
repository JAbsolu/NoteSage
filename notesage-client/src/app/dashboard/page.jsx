"use client";

import Sidebar from "@/app/components/sidebar";
import Link from "next/link";
import { FiUpload, FiCheckCircle, FiCircle } from "react-icons/fi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthGuard from "../hoc/AuthGuard";

function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [profileComplete, setProfileCompletion] = useState(false);
  const [checklistHidden, hideChecklist] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailaddress, setEmailaddress] = useState('');

  //get user and user info
  const getUser = async (id) => {
    const url = `http://localhost/user?id=${id}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await request.json()
      if (request.ok) {
        const user = result.data;
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setEmailaddress(user.emailAddress);
      }
  }

  // read user id from cookies
  useEffect(()=> {
    try {
      const userId = Cookies.get("user-id");
      if (userId) getUser(userId)
      else throw error;

    } catch(error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex bg-light-gray">
      {/* Sidebar (Expandable) */}
      <div className={`fixed inset-y-0 left-0 transition-all duration-300 ${sidebarExpanded ? "w-64" : "w-20"}`}>
        <Sidebar isExpanded={sidebarExpanded} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? "ml-64" : "ml-20"}`}>
        {/* Navbar */}
        <DashboardNavbar toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} firstName={firstname} lastName={lastname} emailAddress={emailaddress}/>

        {/* Add padding-top so content doesn’t overlap the navbar */}
        <div className="p-6 bg-light-gray min-h-screen pt-20">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl mt-2 font-semibold">Hi there! View your most recent flashcards and quizzes.</h1>
            <div className={`flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow ${checklistHidden ? 'hidden': ''}`}>
              <FiCheckCircle className="text-blue text-lg" />
              <span>Created an account</span>
                <span>
                {profileComplete ? <FiCheckCircle className="text-blue text-lg"/> : <FiCircle className="text-lg text-blue"/>}
                </span>
              <span>Complete your profile</span>
              <button className="text-sm text-gray-500">
                <IoMdClose className="text-lg text-blue" onClick={() => hideChecklist(true)}/>
                <span>{checklistHidden ? <TfiArrowCircleLeft className="text-xl text-blue"/> : ''}</span>
              </button>
            </div>
            <div className={`flex items-center bg-white shadow py-2 px-2 rounded-md ${checklistHidden ? "show" : "hidden"}`}>
              <button className={`text-sm text-gray-500 ${checklistHidden ? "show" : "hidden"}`}>
                  <span>{checklistHidden ? <TfiArrowCircleLeft className="text-xl text-blue" onClick={() => hideChecklist(false)}/> : ''}</span>
              </button>
            </div>
          </div>

          {/* Recents Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Recents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flashcards */}
              <div className="space-y-4">
                {Array(4).fill().map((_, i) => (
                  <Link key={i} href={`/flashcards/${i + 1}`} className="block">
                    <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                      <span className="bg-black text-white px-2 py-1 rounded">Bb</span>
                      <div className="ml-4">
                        <h3 className="font-bold">Flashcard title {i + 1}</h3>
                        <p className="text-sm text-gray-600">Flashcard deck: 10 terms - by Author</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quizzes */}
              <div className="space-y-4">
                {Array(4).fill().map((_, i) => (
                  <Link key={i} href={`/quizzes/${i + 1}`} className="block">
                    <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                      <span className="bg-black text-white px-2 py-1 rounded"><MdOutlineQuiz/></span>
                      <div className="ml-4">
                        <h3 className="font-bold">Quiz Title {i + 1}</h3>
                        <p className="text-sm text-gray-600">Quiz description/subtitle - by Author</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Generate with AI Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Generate from text with AI</h2>
            <textarea className="w-full p-4 border rounded-lg bg-gray-100" placeholder="Add your notes here"></textarea>
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-2 bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                <FiUpload />
                <span>Upload file</span>
              </button>
              <button className=" bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                Generate Notes
              </button>
            </div>
          </div>

          {/* Popular Flashcards & Quizzes */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Popular flashcards and quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill().map((_, i) => (
                <Link key={i} href={`/flashcards/${i + 1}`} className="block">
                  <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
                    <h3 className="font-bold">Title - Flashcard {i + 1}</h3>
                    <p className="text-sm text-gray-600">60 terms - by Author</p>
                    <p className="text-sm text-gray-600">Author - Author title</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthGuard(Dashboard);