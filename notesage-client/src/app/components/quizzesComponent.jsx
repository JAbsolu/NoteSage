import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import Cookies from "js-cookie";

const QuizzesComponent = ({ firstName, lastName, emailAddress }) => {
  const [changeTab, setTab] = useState("flashcards");
  const [checkToggle, setToggle] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch user modules
  async function getModules() {
    try {
      const response = await fetch(`http://localhost/user-modules?id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token },
      });

      if (response.ok) {
        const result = await response.json();
        setModules(result.modules || []);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }

  // Handle module creation
  const handleModuleCreating = async () => {
    if (!newModuleTitle.trim()) return;

    const moduleData = { userId, title: newModuleTitle, isPublic: checkToggle };

    try {
      const response = await fetch("http://localhost/create-module", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify(moduleData),
      });

      if (response.ok) {
        const result = await response.json();
        setModules([...modules, result]); // Update module list
        setNewModuleTitle("");
        setIsModuleModalOpen(false); // Close modal
        setStatusMessage("Module created successfully!");
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  useEffect(() => {
    const userIdFromCookie = Cookies.get("user-id");
    const userTokenFromCookie = Cookies.get("auth-token");

    if (userIdFromCookie) setUserId(userIdFromCookie);
    if (userTokenFromCookie) setToken(userTokenFromCookie);

    if (userIdFromCookie) getModules();
  }, [userId, token]);

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-16">
        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-regular">Your workspace for creating new flashcards and quizzes</h1>
            <div className="flex items-center space-x-2">
              <button
                className="text-sm text-gray-500 me-2 bg-white px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("flashcards");
                  localStorage.setItem("tab", "flashcards");
                  window.location.reload();
                }}
              >
                Create flashcards
              </button>
              <button
                className="text-sm text-gray-500 bg-white px-4 py-1 rounded hover:bg-gray-100 focus:outline-2"
                onClick={() => {
                  setTab("quizzes");
                  localStorage.setItem("tab", "quiz");
                  window.location.reload();
                }}
              >
                Create quizzes
              </button>
            </div>
          </div>

          {/* Module Selection */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <div className="mt-2 bg-white px-4 pt-0 rounded-lg">
              <h2 className="text-lg font-regular mb-4">Select or Create a Module</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">Select a module</option>
                  {modules.map((mod) => (
                    <option key={mod._id} value={mod._id}>
                      {mod.title}
                    </option>
                  ))}
                </select>

                {/* Button to Open Modal */}
                <button
                  onClick={() => setIsModuleModalOpen(true)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-400"
                >
                  <FiPlus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating a New Module */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Module</h2>
            <input
              type="text"
              placeholder="Enter module name..."
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="w-full p-3 border rounded-lg mb-2"
            />

            {/* Private/Public Toggle */}
            <div className="flex items-center space-x-2">
              <span>Private</span>
              <FaRegCircleCheck
                className={`text-xl cursor-pointer ${checkToggle ? "block" : "hidden"}`}
                onClick={() => setToggle(false)}
              />
              <FaRegCircle
                className={`text-xl cursor-pointer ${checkToggle ? "hidden" : "block"}`}
                onClick={() => setToggle(true)}
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModuleModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleModuleCreating}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizzesComponent;
