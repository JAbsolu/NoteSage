"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-24 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-blue text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full">
          Ns
        </div>
        <span className="ml-2 text-blue text-xl font-semibold">NoteSage</span>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-6">
        <Link href="/" className="text-blue font-semibold">
          Home
        </Link>
        <Link href="/how-it-works" className="text-gray font-semibold hover:text-blue">
          How it Works
        </Link>
        <Link href="/plans" className="text-gray font-semibold hover:text-blue">
          Plans
        </Link>
        <Link href="/about" className="text-gray font-semibold hover:text-blue">
          About Us
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <Link href="/login" className="px-6 py-1 border-2 border-blue text-blue rounded-full hover:bg-blue hover:text-black transition">
          Login
        </Link>
        <Link href="/signup" className="px-6 py-1 bg-blue text-white rounded-full hover:bg-blue-dark transition">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;