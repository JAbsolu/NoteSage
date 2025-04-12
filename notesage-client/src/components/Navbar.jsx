"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white px-6 md:px-24 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-blue text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full">
          NS
        </div>
        <span className="ml-2 text-blue text-xl font-semibold">NoteSage</span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray hover:text-blue">
          Home
        </Link>
        <Link href="/howItWorks" className="text-gray focus:underline hover:underline">
          How it works
        </Link>
        <Link href="/about" className="text-gray hover:text-blue">
          About Us
        </Link>
        <Link href="/contact-us" className="text-gray hover:text-blue">
          Contact Us
        </Link>
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <Link href="/login" className="px-6 py-1 border-2 border-blue text-blue rounded-full hover:bg-blue hover:font-semibold transition">
          Sign in
        </Link>
        <Link href="/signup" className="px-6 py-1 border-2 border-blue bg-blue text-white rounded-full hover:bg-blue-600 transition">
          Sign up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue text-2xl">
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu (Slide-in) */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col items-center space-y-4 md:hidden transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link href="/" className="text-blue font-semibold" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link href="howItWorks" className="text-gray font-semibold hover:text-blue" onClick={() => setIsOpen(false)}>
          How it Works
        </Link>
        <Link href="/about" className="text-gray font-semibold hover:text-blue" onClick={() => setIsOpen(false)}>
          About Us
        </Link>
        <Link href="/contact-us" className="text-gray font-semibold hover:text-blue" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>

        {/* Mobile Auth Buttons */}
        <Link href="/login" className="w-full text-center px-6 py-2 border-2 border-blue text-blue rounded-full hover:bg-blue hover:text-white transition" onClick={() => setIsOpen(false)}>
          Sign in
        </Link>
        <Link href="/signup" className="w-full text-center px-6 py-2 bg-blue text-white rounded-full hover:bg-blue-dark transition" onClick={() => setIsOpen(false)}>
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
