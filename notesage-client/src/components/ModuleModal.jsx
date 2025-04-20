import { getCookie } from "@/util/cookies";
import React, { useState } from "react";

const ModuleModal = ({ closeModal, userId, token, getModules}) => {
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [modalError, setModalError] = useState("");

  // API Base URL
  const API_URL = process.env.API_URL || "http://localhost:/5000";
  
  const createModal = () => {
    createModule(userId);
  };

  // create module
  const createModule = async (id) => {
    if (!userId) {
      console.log("User id required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/create-module`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ 
          userId: id,
          title: newModuleTitle,
          public: isPublic
        }),
      });

      if (response.ok) {
        const result = await response.json(); // print the result in the console to confirm the card is created
        await getModules(userId);
        closeModal();
        console.log(response.status, "Module created successfully", result);
      } else {
        console.log(response.status, "Error creating module");
        setModalError("Error creating module")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // Close on background click
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Lesson Group</h2>

        <input
          type="text"
          placeholder="Enter module title..."
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        
        {/* module visability option */}
        <span className="flex gap-4">
          <label className="block mt-4 text-sm">Public</label>
          <input type="checkbox" className="mt-4" onChange={() => isPublic ? setIsPublic(false) : setIsPublic(true)}/>
        </span>

        <span className="text-red">
          {modalError}
        </span>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal} // Proper function call
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={createModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
