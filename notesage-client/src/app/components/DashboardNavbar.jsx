"use client";

import { useReducer, useState } from "react";
import Link from "next/link";
import { FiMenu, FiSearch, FiSettings, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DashboardNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
      Cookies.remove("auth-token"); // Delete the cookie
      router.push("/login"); // Redirect user to login page
  }

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Left Section: Hamburger Menu & Logo */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Button */}
        <button onClick={toggleSidebar} className="text-blue text-2xl">
          <FiMenu />
        </button>
        {/* Logo */}
        <h2 className="text-xl font-semibold">NoteSage</h2>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search Notesage"
          className="w-full bg-gray-100 px-10 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Profile Section */}
      <div className="relative">
        {/* Profile Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-blue text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold"
        >
          JA {/* Profile initials */}
        </button>

        {/* Profile Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
            {/* Show User's Full Name */}
            <div className="px-4 py-2 text-gray-700 font-semibold border-b">
              John Absolu
            </div>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <FiSettings className="mr-2" />
              Settings
            </Link>
            <button
              className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={() => handleSignOut()} 
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
