"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { FiUpload, FiCheckCircle, FiCircle } from "react-icons/fi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
import DashboardNavbar from "../../components/DashboardNavbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthGuard from "../hoc/AuthGuard";
import { BsStars } from "react-icons/bs";
import { getCookie } from "@/util/cookies";

function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [profileComplete, setProfileCompletion] = useState(false);
  const [checklistHidden, hideChecklist] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const userId = getCookie("userId");
  const token = getCookie("token");

  //get user and user info
  const getUser = async (id) => {
    if (!id) {
      console.log("User id required to get user");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
  
      const result = await response.json()
        if (response.ok) {
          const user = result.data;
          setFirstname(user.firstName);
          setLastname(user.lastName);
          setEmailaddress(user.emailAddress);
        } else {
          console.log(response.status, response.statusText, "Error getting user")
        }
    } catch(error) {
      console.log(error);
    }
  }

  // read user id from cookies
  useEffect(() => {
    try {
        if (userId) {
            getUser(userId);
        } else {
            console.warn("User ID not found in cookies");
        }
    } catch (error) {
        console.error("Error reading user ID from cookie:", error);
    }
}, []);


  return (
    <div className="flex bg-light-gray text-black">
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
            <h1 className="text-xl mt-0 font-regular">Hi {firstname.charAt(0).toUpperCase() + firstname.substring(1, firstname.length)}, view your most recent flashcards and quizzes.</h1>
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

          {/* Checklist Section */}
<div className="bg-white p-6 rounded-lg shadow-md mt-4">
  <h2 className="text-xl font-semibold mb-4">Today's Checklist</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Flashcards Checklist */}
    <div className="space-y-4">
      {Array(4).fill().map((_, i) => (
        <div key={i} className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
          <input type="checkbox" className="w-5 h-5 mr-4" />
          <span className="bg-black text-white px-2 py-1 rounded">Bb</span>
          <div className="ml-4">
            <h3 className="font-bold">Review Flashcard {i + 1}</h3>
            <p className="text-sm text-gray-600">10 terms - by Author</p>
          </div>
        </div>
      ))}
      {/* Add Task Button for Flashcards */}
      <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        + Add Flashcard Task
      </button>
    </div>

    {/* Quizzes Checklist */}
    <div className="space-y-4">
      {Array(4).fill().map((_, i) => (
        <div key={i} className="flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
          <input type="checkbox" className="w-5 h-5 mr-4" />
          <span className="bg-black text-white px-2 py-1 rounded">
            <MdOutlineQuiz />
          </span>
          <div className="ml-4">
            <h3 className="font-bold">Take Quiz {i + 1}</h3>
            <p className="text-sm text-gray-600">Quiz description - by Author</p>
          </div>
        </div>
      ))}
      {/* Add Task Button for Quizzes */}
      <button className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
        + Add Quiz Task
      </button>
    </div>
  </div>
</div>

          {/* Generate with AI Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="flex">
              <h2 className="text-xl font-semibold mb-4 me-1">Generate from text with AI</h2>
              <BsStars className="mt-1 text-lg"/>
            </div>
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