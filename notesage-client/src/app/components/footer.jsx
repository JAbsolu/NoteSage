"use client";

export default function Footer() {
  return (
    <footer className="bg-white shadow-t-md py-2 px-20 flex justify-between items-center text-gray">
      {/* Social Links */}
      <div className="flex space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:text-blue">
          Facebook
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:text-blue">
          LinkedIn
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:text-blue">
          Instagram
        </a>
      </div>

      {/* Copyright */}
      <div className="text-sm">
        &copy; NoteSage 2025
      </div>
    </footer>
  );
}