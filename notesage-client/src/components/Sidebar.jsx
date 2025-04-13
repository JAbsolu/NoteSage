"use client";

import Link from "next/link";
import { FiHome, FiBell, FiFileText } from "react-icons/fi";
import { MdOutlineComputer } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiCardsThree } from "react-icons/pi";

const Sidebar = ({ isExpanded }) => {
  const [allNotifications, setAllNotifications] = useState([]);
  
  useEffect(()=> {
    const notifications = JSON.parse(localStorage.getItem("notifications"));
    setAllNotifications(notifications);
  }, []);

  return (
    <div className={`bg-blue text-white ${isExpanded ? "w-64" : "w-20"} min-h-screen p-4 mt-4 transition-all duration-300`}>
      {/* Nav Links */}
      <nav className="flex flex-col space-y-6 mt-14">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-200">
          <FiHome className="text-xl" />
          {isExpanded && <span className="text-white">Home</span>}
        </Link>
        <Link href="/dashboard/notifications" className="flex items-center space-x-2 hover:text-gray-200">
          <FiBell className="text-xl -me-4" />
          <div className="flex items-center justify-center bg-red-600 border min-w-6 min-h-6 rounded-full text-xs">{allNotifications?.length || "0"}</div>
          {isExpanded && <span className="text-white">Notifications</span>}
        </Link>
        <Link href="/dashboard/workspace" className="flex items-center space-x-2 hover:text-gray-200">
          <MdOutlineComputer className="text-xl" />
          {isExpanded && <span className="text-white">Workspace</span>}
        </Link>
        <Link href="/dashboard/flashcards" className="flex items-center space-x-2 hover:text-gray-200">
          <PiCardsThree className="text-xl" />
          {isExpanded && <span className="text-white">Flashcards</span>}
        </Link>
        <Link href="/dashboard/quizzes" className="flex items-center space-x-2 hover:text-gray-200">
          <MdOutlineQuiz className="text-xl" />
          {isExpanded && <span className="text-white">Quizzes</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;