"use client"

import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Sidebar from "../components/sidebar";
import { CiSquarePlus } from "react-icons/ci";
import { BsStars } from "react-icons/bs";


const WorkSpace = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLasttname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState("");
  const [decks, setDecks] = useState([]);

  const userId = Cookies.get("user-id");
  const token = Cookies.get("auth-token");

  /*----API CALLS-------------------------------------------------------------*/
  // get user
  const getUser = async (id) => {
    const url = `http://localhost/user?id=${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      if (response.ok) {
        const result = await response.json();
        setFirstname(result.data.firstName);
        setLasttname(result.data.lastName);
        setEmailAddress(result.data.emailAddress);
      }

    } catch (error) {
      console.log(error)
    }
   
  }

  // Get modules
  const getModules = async (id) => {
    try {
      const url = `http://localhost/modules?id=${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      if (response.ok) {
        const result = await response.json();
        //save modules
        setModules(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //get decks
  const getModuleDecks = async (id) => {
    try {
      const response = await fetch(`http://localhost/module-decks?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })

      if (response.ok) {
        const result = await response.json();
        //save 
        alert(JSON.stringify(result))
        setDecks(result.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*------------------------------------------------------------------ */

  useEffect(function(){
    getUser(userId);
    getModules(userId);
    // getModuleDecks(moduleId);
  }, []);

  return (
    <div className="flex bg-light-gray min-h-screen">
      {/* import dashboard */}
      <DashboardNavbar 
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName} 
        lastName={lastName} 
        emailAddress={emailAddress}
      />
      <Sidebar isExpanded={sidebarExpanded}/>
      
      <div className="flex-1 bg-grey-200 shadow flex flex-col mt-16">
        <h1 className="mt-6 ps-3 mb-4 text-xl" >Create Flashcards, Quizzes, and Papers</h1>
        <div className="flex bg-white border py-2 mx-2 rounded-md">
          <div className="bg-white px-6 w-1/2 mx-2 mt-4 rounded" >
            <h3 className="mb-3 text-lg" >Create Flashcards</h3>

            {/* modules selction */}
            <div className="flex">
              <select
                // value={selectedModule}
                onChange={(e) => {
                  const moduleId = e.target.value;
                  // setSelectedModule(moduleId); // Update state
                  getModuleDecks(moduleId); // Fetch module decks
                }}
                className="p-2 border rounded-lg w-full me-2"
              >
                <option value="" name="module" id="">Select a module</option>
                {modules.map((mod) => (
                  <option key={mod._id} value={mod._id} onChange={(e) => getModuleDecks(e.target.value)}>
                    {mod.title}
                  </option>
                ))}
              </select>
              <CiSquarePlus className="text-4xl text-gray-400 cursor-pointer hover:text-blue-400"/>
            </div>

            
            {/* decks selection */}
            <div className="flex mt-4">
              <select
                // value={selectedModule}
                // onChange={(e) => setSelectedModule(e.target.value)}
                className="p-4 border rounded-lg w-full me-2"
              >
                <option value="" name="module" id="">Select a deck</option>
                {decks.map((mod) => (
                  <option key={deck._id} value={deck._id} onChange={(e) => setModuleId(e.target.value)}>
                    {deck.title}
                  </option>
                ))}
              </select>
              <CiSquarePlus className="text-4xl text-gray-400 cursor-pointer hover:text-blue-400"/>
            </div>
          
            <input type="text" placeholder="Flashcard front" className="mt-4 p-2 border w-full rounded-md" />
            <textarea name="back" placeholder="Card content here" className="mt-4 p-2 border w-full rounded-md"></textarea>
          </div>
          
          {/* card tp create quizzes */}
          <div className="bg-white p-4 mx-6 mt-4 rounded shadow w-1/2" >
            <label htmlFor="title">Title</label>
            <input type="text" />
          </div>
        </div> {/* end of block to create flashcard and quizzes */}
        
        {/* Start of block to create paper */}
        <div className="flex">
          <div className="bg-white w-full p-4 mx-6 mt-4 rounded shadow" >
            <label htmlFor="title">Title</label>
            <input type="text" />
          </div>

          <div className="bg-white w-full p-4 mx-6 mt-4 rounded shadow" >
            <label htmlFor="title">Title</label>
            <input type="text" />
          </div>
        </div> {/* end of block to create paper */}

        {/* Generate with AI Section */}
        <div className="bg-white p-6 rounded-lg mt-6 mx-2 shadow">
           <div className="flex">
             <h2 className="text-lg font-regular mb-4 me-1">Generate from text with AI</h2>
             <BsStars className="mt-1 text-lg"/>
           </div>
           <textarea className="w-full p-4 border rounded-lg bg-gray-100" placeholder="Add your notes here"></textarea>
           <div className="flex items-center mt-4 space-x-4">
             <button className="flex items-center space-x-2 bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
               {/* <FiUpload /> */}
               <span>Upload file</span>
             </button>
             <button className=" bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-dark transition">
               Generate Flashcards
             </button>
           </div>
         </div>
       
      </div>
    </div>
  )
}

export default WorkSpace;