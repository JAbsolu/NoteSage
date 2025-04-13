import { useState } from "react";
import { RxCross1 } from "react-icons/rx";


const StudyFlashcardModal = ({ closeModal, flashcards, deckTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle edge case if no flashcards are provided
  if (!flashcards || flashcards.length === 0) {
    return (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[80%] flex flex-col justify-between">
          {/* Modal Header */}
          <div className="flex justify-end items-center">
            <button
              onClick={closeModal}
              className="text-black rounded-lg hover:bg-red-400 hover:text-gray-500 p-1"
            >
              <RxCross1 />
            </button>
          </div>
          <div className="flex justify-center items-center h-full text-gray-600 text-lg">
            No flashcards available.
          </div>
        </div>
      </div>
    );
  }

  // Handle "Next" button click
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFront(true);
    } else {
      setIsCompleted(true);
    }
  };

  // Handle "Previous" button click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFront(true);
    }
  };

  // Show next/previous or show completed options
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setShowFront(true);
  };

  // Toggle between front and back
  const handleCardClick = () => {
    setShowFront(!showFront);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] h-[80%] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <p className="text-xl text-white text-center w-full">{deckTitle || ""}</p>
          <button
            onClick={closeModal}
            className="text-black rounded-lg hover:bg-red-400 hover:text-gray-500 p-1"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Show Completion Message */}
        {isCompleted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-bold text-green-600 mb-4">
              You've completed all the flashcards!
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Start Over
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end items-center h-full">
            {/* Flashcard Container */}
            <div
              className="relative w-[40em h-[20em] max-w-[85%] max-h-[83%] px-20 flex justify-center items-center cursor-pointer text-xl font-semibold"
              onClick={handleCardClick}
            >
              {showFront 
                
                ? <p className="font-bold">{flashcards[currentIndex]?.front || "No term available"}</p>
                : <p className="font-normal">{flashcards[currentIndex]?.back || "No definition available"}</p>
              }
            </div>

            {/* Pagination and Navigation */}
            <div className="w-full pb-8">
              <div className="flex gap-6 justify-center items-center mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-lg ${
                    currentIndex === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-dark-blue text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <p className="text-gray-600">
                  {currentIndex + 1} / {flashcards.length}
                </p>
                <button
                  onClick={handleNext}
                  className="bg-dark-blue text-white px-8 py-2 rounded-lg hover:bg-blue-600"
                >
                  {currentIndex === flashcards.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyFlashcardModal;