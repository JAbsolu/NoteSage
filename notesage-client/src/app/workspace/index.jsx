"use client";

import "../page.jsx";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardNavbar from "@/app/components/DashboardNavbar.jsx";
import FlashcardsComponent from "@/app/components/flashcardscreation.jsx";
import QuizzesComponent from "@/app/components/quizzesComponent.jsx";
import Sidebar from "@/app/components/sidebar.jsx";
import { FiPlus } from "react-icons/fi";
import AuthGuard from "../hoc/AuthGuard.js";

 function CreateFlashcard() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [quizTab, setQuizTab] = useState(false);
 

  // Get user info
  const getUser = async (id) => {
    try {
      const url = `http://localhost/user?id=${id}`;
      const request = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (request.ok) {
        const result = await request.json();
        const user = result.data;
        setUserId(user._id);
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setEmailaddress(user.emailAddress);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Handle new module creation
  const handleNewModuleSubmit = async () => {
    if (!newModuleTitle.trim()) return;

    try {
      const url = "http://localhost/create-module";
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ title: newModuleTitle, userId }),
      });

      if (request.ok) {
        const newModule = await request.json();
        setModules([...modules, newModule]);
        setNewModuleTitle("");
        setShowNewModuleInput(false);
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  // Read user ID and token from cookies
  useEffect(() => {
    try {
      const userId = Cookies.get("user-id");
      const userToken = Cookies.get("auth-token");

      if (userId) getUser(userId);
      if (userToken) setToken(userToken);

      setQuizTab(localStorage.getItem("tab") === "quiz");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex bg-light-gray min-h-screen">
      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstname}
        lastName={lastname}
        emailAddress={emailaddress}
      />

      <Sidebar isExpanded={sidebarExpanded} />
      {/* Main Content */}
      {quizTab ? (
        <QuizzesComponent firstName={firstname} lastName={lastname} emailAddress={emailaddress} />
      ) : (
        <FlashcardsComponent firstName={firstname} lastName={lastname} emailAddress={emailaddress} userId={userId} token={token} />
      )}
    </div>
  );
}

export default AuthGuard(CreateFlashcard);