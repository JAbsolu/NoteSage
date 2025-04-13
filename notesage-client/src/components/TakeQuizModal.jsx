import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const TakeQuizModal = ({ closeModal, questions, quizTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const choices = currentQuestion?.choices || {};

  const handleChoiceClick = (choiceKey) => {
    if (selectedChoice) return; // prevent re-selection
    setSelectedChoice(choiceKey);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedChoice(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsCompleted(false);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] h-[80%] flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between">
          <p className="text-xl font-bold">{quizTitle}</p>
          <button onClick={closeModal}>
            <RxCross1 />
          </button>
        </div>

        {isCompleted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-green-600 text-2xl font-bold mb-4">
              Quiz Completed!
            </p>
            <div className="flex gap-4">
              <button onClick={handleRestart} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Restart
              </button>
              <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-6">
            <p className="text-lg font-semibold">{currentQuestion?.question}</p>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(choices).filter(key => key !== "correct").map((choiceKey) => (
                <button
                  key={choiceKey}
                  onClick={() => handleChoiceClick(choiceKey)}
                  className={`border px-4 py-2 rounded-lg text-start text-black
                    ${selectedChoice === choiceKey && choiceKey === choices.correct ? "bg-green-400 text-black" : ""}
                    ${selectedChoice === choiceKey && choiceKey !== choices.correct ? "bg-red-400 text-black" : ""}
                    ${selectedChoice && choices.correct === choiceKey && selectedChoice !== choiceKey ? "bg-green-400 text-white" : ""}
                    ${selectedChoice ? "cursor-not-allowed" : "hover:bg-blue-100"}
                  `}
                >
                  {choiceKey}: {choices[choiceKey]}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedChoice}
                className="bg-dark-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuizModal;
