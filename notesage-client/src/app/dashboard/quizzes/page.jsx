"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/util/cookies";
import { useEffect, useState } from "react";

const QuizzesPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const userId = getCookie("userId");
  const token = getCookie("token");
  
  // Dummy quiz data state
  const [quizzes, setQuizzes] = useState([
    {
      _id: "1",
      userid: "user1",
      moduleId: "module1",
      title: "Sample Quiz 1",
      description: "This is a sample quiz",
      contents: [
        {
          question: "What is 2+2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4"
        },
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris"
        }
      ]
    }
  ]);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    contents: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
  });
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [takingQuiz, setTakingQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);

  useEffect(() => {
    getUser(userId);
    // In a real app, you would fetch quizzes here
    // fetchQuizzes();
  }, []);

  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmailAddress(result.data.emailAddress);
      } else {
        console.log(response.status, response.statusText, "Error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Dummy CRUD operations
  const createQuiz = () => {
    const quizToAdd = {
      ...newQuiz,
      _id: Date.now().toString(),
      userid: userId,
      moduleId: "module1" // In real app, this would be selected
    };
    setQuizzes([...quizzes, quizToAdd]);
    /*setNewQuiz({
      title: "",
      description: "",
      contents: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
    });*/
    resetQuizForm();
  };

  const updateQuiz = () => {
    setQuizzes(quizzes.map(quiz => 
      quiz._id === editingQuizId ? { ...quiz, ...newQuiz } : quiz
    ));
    setEditingQuizId(null);
    /*setNewQuiz({
      title: "",
      description: "",
      contents: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
    });*/
    resetQuizForm();
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz._id !== id));
  };

  const startEditQuiz = (quiz) => {
    setEditingQuizId(quiz._id);
    setNewQuiz({
      title: quiz.title,
      description: quiz.description,
      contents: quiz.contents
    });
  };
  const resetQuizForm = () => {
    setNewQuiz({
      title: "",
      description: "",
      contents: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
    });
  };
// Take Quiz functions
const startTakingQuiz = (quiz) => {
  setTakingQuiz(quiz);
  setUserAnswers({});
  setQuizResult(null);
  setShowQuizDialog(true);
};
const submitQuiz = () => {
  if (!takingQuiz) return;
  
  let correctCount = 0;
  takingQuiz.contents.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / takingQuiz.contents.length) * 100);
  setQuizResult({
    score,
    correctCount,
    totalQuestions: takingQuiz.contents.length
  });
};

const closeQuizDialog = () => {
  setShowQuizDialog(false);
  setTakingQuiz(null);
  setUserAnswers({});
  setQuizResult(null);
};


const handleAnswerSelect = (questionIndex, selectedAnswer) => {
  setUserAnswers({
    ...userAnswers,
    [questionIndex]: selectedAnswer
  });
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz({ ...newQuiz, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedContents = [...newQuiz.contents];
    updatedContents[index][field] = value;
    setNewQuiz({ ...newQuiz, contents: updatedContents });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedContents = [...newQuiz.contents];
    updatedContents[questionIndex].options[optionIndex] = value;
    setNewQuiz({ ...newQuiz, contents: updatedContents });
  };

  const addNewQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      contents: [
        ...newQuiz.contents,
        { question: "", options: ["", "", "", ""], correctAnswer: "" }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
      />
      <div className="flex pt-16">

      <div className={`fixed h-full ${sidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <Sidebar isExpanded={sidebarExpanded} />
        </div>

      
      {/* Main Content - adjusts based on sidebar width */}
        <div className={`flex-1 ${sidebarExpanded ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
          

        <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
        
        {/* Quiz Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={newQuiz.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newQuiz.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
            
            {newQuiz.contents.map((content, questionIndex) => (
              <div key={questionIndex} className="border p-4 rounded-lg">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Question {questionIndex + 1}</label>
                  <input
                    type="text"
                    value={content.question}
                    onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {content.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label className="block text-sm font-medium text-gray-700">
                        Option {optionIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                  <select
                    value={content.correctAnswer}
                    onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  >
                    {content.options.map((option, index) => (
                      <option key={index} value={option}>
                        Option {index + 1} {option && `(${option})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            
            <button
              onClick={addNewQuestion}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Add Another Question
            </button>
            
            <div className="flex justify-end space-x-4">
              {editingQuizId && (
                <button
                  onClick={() => {
                    setEditingQuizId(null);
                    setNewQuiz({
                      title: "",
                      description: "",
                      contents: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={editingQuizId ? updateQuiz : createQuiz}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingQuizId ? "Update Quiz" : "Create Quiz"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Quiz List */}
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {quiz.contents.length} question{quiz.contents.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex space-x-2">
                <button
                    onClick={() => startTakingQuiz(quiz)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                  >
                    Take Quiz
                  </button>

                  <button
                    onClick={() => startEditQuiz(quiz)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {/* Quiz Questions Preview */}
              <div className="mt-4 space-y-3">
                {quiz.contents.slice(0, 2).map((content, index) => (
                  <div key={index} className="border-t pt-3">
                    <p className="font-medium">{content.question}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {content.options.map((option, optIndex) => (
                        <li key={optIndex} className={option === content.correctAnswer ? 'text-green-600 font-medium' : ''}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {quiz.contents.length > 2 && (
                  <p className="text-sm text-gray-500">+ {quiz.contents.length - 2} more questions...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      {/* Quiz Dialog */}
      {showQuizDialog && takingQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{takingQuiz.title}</h2>
                <button 
                  onClick={closeQuizDialog}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {quizResult ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
                  <div className="text-4xl font-bold mb-2" style={{ 
                    color: quizResult.score >= 70 ? 'green' : quizResult.score >= 50 ? 'orange' : 'red'
                  }}>
                    {quizResult.score}%
                  </div>
                  <p className="text-lg mb-6">
                    You got {quizResult.correctCount} out of {quizResult.totalQuestions} questions correct
                  </p>
                  <button
                    onClick={closeQuizDialog}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-gray-600">{takingQuiz.description}</p>
                  
                  <div className="space-y-6">
                    {takingQuiz.contents.map((question, index) => (
                      <div key={index} className="border-b pb-4">
                        <h4 className="font-medium mb-3">{index + 1}. {question.question}</h4>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center">
                              <input
                                type="radio"
                                id={`q${index}-o${optIndex}`}
                                name={`question-${index}`}
                                checked={userAnswers[index] === option}
                                onChange={() => handleAnswerSelect(index, option)}
                                className="mr-2"
                              />
                              <label htmlFor={`q${index}-o${optIndex}`} className="cursor-pointer">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(userAnswers).length !== takingQuiz.contents.length}
                      className={`px-6 py-2 rounded-md text-white ${Object.keys(userAnswers).length === takingQuiz.contents.length ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Submit Quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>


  );
};

export default QuizzesPage;