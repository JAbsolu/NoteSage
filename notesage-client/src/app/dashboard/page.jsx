"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { FiUpload, FiCheckCircle, FiCircle, FiMoreHorizontal } from "react-icons/fi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md"; 
import DashboardNavbar from "../../components/DashboardNavbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AuthGuard from "../hoc/AuthGuard";
import { BsStars } from "react-icons/bs";
import { getCookie } from "@/util/cookies";
import CreateTaskModal from "@/components/CreateTaskModal";

function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [profileComplete, setProfileCompletion] = useState(false);
  const [checklistHidden, hideChecklist] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState({
    title: "",
    description: "",
    completed: false
  });
  const userId = getCookie("userId");
  const token = getCookie("token");
  const [taskId, setTaskId] = useState("");
  const [taskInfo, setTaskInfo] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });  

  //get user and user info
  const getUser = async (id) => {
    if (!id) {
      console.log("User id required to get user");
      return;
    }

    try {
      const response = await fetch(`http://localhost/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await response.json();
      if (response.ok) {
        const user = result.data;
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setEmailaddress(user.emailAddress);
      } else {
        console.log(response.status, response.statusText, "Error getting user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // read user id from cookies
  useEffect(() => {
    try {
      if (userId) {
        getUser(userId);
      } else {
        console.warn("User ID not found in cookies");
      }
    } catch (error) {
      console.error("Error reading user ID from cookie:", error);
    }
  }, []);

  const createTask = async () => {
    try {
      const response = await fetch(`http://localhost/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(taskInfo),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.log(response.status, result.message);
        return;
      }
  
      console.log(response.status, result.message);
  
      getTasks(userId);   // <--- Add this
  
    } catch (error) {
      console.log(error);
    }
  };  

  // get tasks
  const getTasks = async (id) => {
    if (!id) {
      console.log("id not found");
      return;
    }

    try {
      const response = await fetch(`http://localhost/user-tasks?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(response.status, result.message);
        return;
      }
      
      setTasks(result.data);
      console.log(response.status, result.message, result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // update task
  const updateTask = async(taskId) => {
    console.log("task id",taskId)
    try {
      const response = await fetch(`http://localhost/update-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(selectedTaskInfo)
      })

      const result = await response.json();

      if (!response.ok) {
        console.log(response.status, result.message);
        return;
      }

      await getTasks(userId);
      console.log(response.status, result.message, result.data);
    } catch (error) {
      console.log(error)
    }
  }

  //delete task
  const deleteteTask = async(taskId) => {
    try {
      const response = await fetch(`http://localhost/delete-task?id=${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      const result = await response.json();

      if (!response.ok) {
        console.log(response.status, result.message);
        return;
      }

      await getTasks(userId);
      console.log(response.status, result.message, result.data);
    } catch (error) {
      console.log(error)
    }
  }

  //useEffects
  useEffect(() => {
    if (userId) {
      getTasks(userId);
    }
  }, [userId]);
  

  return (
    <div className="flex bg-light-gray text-black">
      {/* Sidebar (Expandable) */}
      <div
        className={`fixed inset-y-0 left-0 transition-all duration-300 ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <Sidebar isExpanded={sidebarExpanded} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? "ml-64" : "ml-20"
        }`}
      >
        {/* Navbar */}
        <DashboardNavbar
          toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
          firstName={firstname}
          lastName={lastname}
          emailAddress={emailaddress}
        />

        {/* Add padding-top so content doesn’t overlap the navbar */}
        <div className="p-6 bg-light-gray min-h-screen pt-20">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl mt-0 font-regular">
              Hi{" "}
              {firstname.charAt(0).toUpperCase() +
                firstname.substring(1, firstname.length)}
              , view your most recent flashcards and quizzes.
            </h1>
            <div
              className={`flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow ${
                checklistHidden ? "hidden" : ""
              }`}
            >
              <FiCheckCircle className="text-blue text-lg" />
              <span>Created an account</span>
              <span>
                {profileComplete ? (
                  <FiCheckCircle className="text-blue text-lg" />
                ) : (
                  <FiCircle className="text-lg text-blue" />
                )}
              </span>
              <span>Complete your profile</span>
              <button className="text-sm text-gray-500">
                <IoMdClose
                  className="text-lg text-blue"
                  onClick={() => hideChecklist(true)}
                />
                <span>
                  {checklistHidden ? (
                    <TfiArrowCircleLeft className="text-xl text-blue" />
                  ) : (
                    ""
                  )}
                </span>
              </button>
            </div>
            <div
              className={`flex items-center bg-white shadow py-2 px-2 rounded-md ${
                checklistHidden ? "show" : "hidden"
              }`}
            >
              <button
                className={`text-sm text-gray-500 ${
                  checklistHidden ? "show" : "hidden"
                }`}
              >
                <span>
                  {checklistHidden ? (
                    <TfiArrowCircleLeft
                      className="text-xl text-blue"
                      onClick={() => hideChecklist(false)}
                    />
                  ) : (
                    ""
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Checklist Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4 min-h-[30em]">
            <h2 className="text-xl font-semibold mb-4">My Checklist</h2>
            <div className="flex flex-wrap gap-y-4 gap-x-[1%]">
              {/* Flashcards Checklist */}
                {tasks &&
                  tasks.map((task, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center ${task.completed ? "bg-gray-300 hover:bg-gray-300 text-gray-[600]" : "bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"} py-3 px-4 w-[49.5%] rounded-lg  transition relative`}
                    >
                      <div className="flex items-center">
                        <div>
                          <h3 className="font-bold">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdownIndex(activeDropdownIndex === i ? null : i)
                          }
                          className="p-2 hover:bg-gray-300 rounded-full"
                        >
                          <FiMoreHorizontal size={18} />
                        </button>

                        {activeDropdownIndex === i && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => {
                                setSelectedTaskInfo({
                                  id: task._id,
                                  title: task.title,
                                  description: task.description,
                                  completed: task.completed
                                })
                                setActiveDropdownIndex(false)
                                setShowUpdateTaskModal(true)
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => {
                                setTaskId(task._id)
                                setShowDeleteModal(true)
                                setActiveDropdownIndex(false)
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {
                    tasks.length === 0 && (
                      <div className="h-[20em] p-4 rounded-md flex justify-start border-2 w-full border-dashed">
                        <p className="text-gray-500 italic">No tasks, create your first task.</p>
                      </div>
                    )
                  }
               {/* Add Task Button*/}
              <button
                className="lg:w-[50%] mt-4 bg-blue text-white py-2 rounded-lg hover:font-bold transition"
                onClick={() => { 
                  setTaskInfo({
                    id: userId,   // <-- always latest value
                    title: "",
                    description: "",
                    completed: false
                  })
                  setShowModal(true);
                }}
              >
                + Create New Task
              </button>
            </div>
          </div>

          {/* Generate with AI Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="flex">
              <h2 className="text-xl font-semibold mb-4 me-1">
                Generate tasks with AI
              </h2>
              <BsStars className="mt-1 text-lg" />
            </div>
            <textarea
              className="w-full p-4 border rounded-lg bg-gray-100"
              placeholder="Add your notes here"
            ></textarea>
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-2 bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                <FiUpload />
                <span className="text-white">Upload file</span>
              </button>
              <button className=" bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
                Generate Notes
              </button>
            </div>
          </div>

          {/* Popular Flashcards & Quizzes */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Popular flashcards and quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3)
                .fill()
                .map((_, i) => (
                  <Link key={i} href={`/flashcards/${i + 1}`} className="block">
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
                      <h3 className="font-bold">Title - Flashcard {i + 1}</h3>
                      <p className="text-sm text-gray-600">
                        60 terms - by Author
                      </p>
                      <p className="text-sm text-gray-600">
                        Author - Author title
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* show create task modal */}
      {
        showModal && <CreateTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        taskInfo={taskInfo}
        setTaskInfo={setTaskInfo}
        createTask={createTask}
      />
      }

      {/* show update modal */}
      {
        showUpdateTaskModal && <UpdateTaskModal 
          isOpen={showUpdateTaskModal} 
          onClose={() => setShowUpdateTaskModal(false)}
          taskInfo={selectedTaskInfo}
          updateTask={updateTask}
          setSelectedTaskInfo={setSelectedTaskInfo}
        />
      }

      {/* show delete confirmation modal */}
      {
        showDeleteModal && <DeletionConfirmationModal 
          taskId={taskId}
          deleteItem={deleteteTask}
          setShowModal={setShowDeleteModal}
        />
      }
    </div>
  );
}

function UpdateTaskModal({ isOpen, onClose, taskInfo, setSelectedTaskInfo, updateTask }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={taskInfo.title || ""}
            onChange={(e) => setSelectedTaskInfo({ ...taskInfo, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={taskInfo.description || ""}
            onChange={(e) => setSelectedTaskInfo({ ...taskInfo, description: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={taskInfo.completed || false}
            onChange={(e) => setSelectedTaskInfo({ ...taskInfo, completed: e.target.checked })}
            className="mr-2"
          />
          <label className="text-gray-700">Completed</label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              updateTask(taskInfo.id);
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue text-white hover:bg-blue-dark"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const DeletionConfirmationModal = ({ taskId, deleteItem, setShowModal }) => {

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to perform this action? </h2>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={()=>{
              deleteItem(taskId)
              setShowModal(false);
            }} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-400 hover:text-gray-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


export default AuthGuard(Dashboard);
