"use client";

import "../../page.jsx";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardNavbar from "@/app/components/DashboardNavbar.jsx";
import FlashcardsComponent from "@/app/components/flashcardscreation.jsx";
import QuizzesComponent from "@/app/components/quizzesComponent.jsx";
import Sidebar from "@/app/components/sidebar.jsx";
import Cookie from "js-cookie";


export default function CreateFlashcard() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [quizTab, setQuizTab] = useState(false);

  //get token
  const userToken = Cookie.get("auth-token");
  setToken(userToken);

  
  //get user and user info
  const getUser = async (id) => {
    const url = `http://localhost/user?id=${id}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await request.json()
      if (request.ok) {
        const user = result.data;
        setUserId(user._id);
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setEmailaddress(user.emailAddress);
      }
  }

  // read user id from cookies
    useEffect(()=> {
      try {
        const userId = Cookies.get("user-id");
        if (userId) getUser(userId)
        else throw error;
        
        //set correct tab
        localStorage.getItem("tab") === "quiz" ? setQuizTab(true) : setQuizTab(false);
  
      } catch(error) {
        console.error(error);
      }
    }, []);

    // return pages
    return (
      <div className="flex bg-light-gray min-h-screen">
        <DashboardNavbar 
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} 
        firstName={firstname} 
        lastName={lastname} 
        emailAddress={emailaddress}
      />
      {/* Sidebar */}
      <Sidebar isExpanded={sidebarExpanded} />

      {/* Main Content */}
      {
        quizTab ? 
          <QuizzesComponent firstName={firstname} lastName={lastname} emailAddress={emailaddress}/> : 
          <FlashcardsComponent firstName={firstname} lastName={lastname} emailAddress={emailaddress} userId={userId}token={token}/>
      }
      </div>
    )
}
