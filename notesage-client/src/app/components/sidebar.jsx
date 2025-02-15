"use client";

import Link from "next/link";
import { FiHome, FiBell, FiFileText, FiHelpCircle } from "react-icons/fi";

const Sidebar = ({ isExpanded }) => {
  return (
    <div className={`bg-blue text-white ${isExpanded ? "w-64" : "w-20"} min-h-screen p-4 mt-4 transition-all duration-300`}>
      {/* Logo */}
      <h2 className={`text-2xl font-bold mb-8 ${!isExpanded && "hidden"} md:block`}>NoteSage</h2>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-6">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-200">
          <FiHome className="text-xl" />
          {isExpanded && <span>Home</span>}
        </Link>
        <Link href="/notifications" className="flex items-center space-x-2 hover:text-gray-200">
          <FiBell className="text-xl" />
          {isExpanded && <span>Notifications</span>}
        </Link>
        <Link href="/flashcards" className="flex items-center space-x-2 hover:text-gray-200">
          <FiFileText className="text-xl" />
          {isExpanded && <span>Flashcards</span>}
        </Link>
        <Link href="/quizzes" className="flex items-center space-x-2 hover:text-gray-200">
          <FiHelpCircle className="text-xl" />
          {isExpanded && <span>Quizzes</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;