'use client';

import { CreateOrganize, GenerateFlashcards, StudyReview, TrackImprove, FinalStatement } from "../../../public/howItWorks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const HowItWorksPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex bg-light-gray justify-center flex-column h-[86.5vh]">  
        {/* Right Side - How It Works Section */}
        <div className="w-1/2 p-10 flex flex-col text-auto">
          <h2 className="text-2xl font-semibold mb-2 text-start mb-6">How it Works</h2>
          <h3 className="text-lg font-semibold mb-2 mt-4">Create & Organize</h3>
          <p className="text-md">{CreateOrganize}</p>
          <h3 className="text-lg font-semibold mb-2 mt-4">Generate Flashcards & Quizzes</h3>
          <p className="text-md">{GenerateFlashcards}</p>
          <h3 className="text-lg font-semibold mb-2 mt-4">Study & Review Anytime</h3>
          <p className="text-md">{StudyReview}</p>
          <h3 className="text-lg font-semibold mb-2 mt-4">Track & Improve</h3>
          <p className="text-md">{TrackImprove}</p>
          <p className="text-md mt-2">{FinalStatement}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HowItWorksPage;