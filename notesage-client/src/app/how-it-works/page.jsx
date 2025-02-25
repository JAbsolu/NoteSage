'use client';

import Footer from "../components/footer";
import Navbar from "../components/navbar";

const HowItWorksPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-[86.5vh]">
        {/* Left Side - Background Image Placeholder */}
        <div className="w-1/2 bg-gray-300 flex items-center justify-center text-black font-bold text-xl">
          Background photo placeholder
        </div>

        {/* Right Side - How It Works Section */}
        <div className="w-1/2 bg-blue p-10 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg">
            NoteSage makes studying easier by turning your notes into interactive flashcards and quizzes in just a few simple steps.
          </p>

          <ol className="list-decimal list-inside space-y-3 mt-4">
            <li>
              <strong>Create & Organize</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Easily add your notes and study materials.</li>
                <li>Organize them into subjects or topics for quick access.</li>
              </ul>
            </li>
            <li>
              <strong>Generate Flashcards & Quizzes</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Convert key concepts into custom flashcards for easy review.</li>
                <li>Create quizzes to test your knowledge and track progress.</li>
              </ul>
            </li>
            <li>
              <strong>Study & Review Anytime</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Access your flashcards and quizzes anytime, anywhere.</li>
                <li>Reinforce learning through repetition and active recall.</li>
              </ul>
            </li>
            <li>
              <strong>Track & Improve</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Monitor your performance and identify areas for improvement.</li>
                <li>Stay consistent with structured, focused study sessions.</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HowItWorksPage;
