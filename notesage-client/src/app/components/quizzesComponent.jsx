import { useState } from "react";
import { FiPlus, FiTrash2, FiImage } from "react-icons/fi";
import Sidebar from "@/app/components/sidebar";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { BsStars } from "react-icons/bs";

const QuizzesComponent = ({firstName, lastName, emailAddress}) => {
  //chose whether to show quiz creation form
  const [changeTab, setTab] = useState("flashcards");

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-16">

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-regular">Your workspace for creating new flashcards and quizzes</h1>
            <div className={`flex items-center space-x-2`}>
              <button 
                className="text-sm text-gray-500 me-2 bg-white px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("flashcards");
                  localStorage.setItem("tab", "flashcards");
                  window.location.reload();
                }}
              >
                Create flashcards
              </button>
              <button 
                className="text-sm text-gray-500 bg-white px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("quizzes");
                  localStorage.setItem("tab", "quiz");
                  window.location.reload();
                }} 
              >
                Create quizzes
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </>
  )
}

export default QuizzesComponent;