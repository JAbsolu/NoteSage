'use client';

import Footer from "../components/footer";
import Navbar from "../components/navbar";

const AboutPage = () => {
  return (
    <>
    <Navbar />
        <div className="flex h-[86.5vh]">
      {/* Left Side - Background Image Placeholder */}
      <div className="w-1/2 bg-gray-300 flex items-center justify-center text-black font-bold text-xl">
        Background photo placeholder
      </div>
      
      {/* Right Side - About Us Section */}
      <div className="w-1/2 bg-blue p-10 flex flex-col justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">About us</h2>
        <p className="text-lg">
          The objective of NoteSage is to create a full-stack web application that enables students to efficiently create,
          organize, and study from custom flashcards and quizzes based on their notes and resources. NoteSage aims to
          streamline the study process by providing a platform where users can create tailored study materials and access
          quizzes on specific topics.
        </p>
        <p className="text-lg mt-4">
          The deliverables include a responsive web app with a backend built on Node.js, Express, and MongoDB, and a frontend
          developed using either Bootstrap 5 or React.js for an intuitive web, and mobile-friendly experience.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default AboutPage;