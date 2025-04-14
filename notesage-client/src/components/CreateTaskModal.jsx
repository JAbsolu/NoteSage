"use client";

import { useState } from "react";

export default function CreateTaskModal({ isOpen, onClose, taskInfo, setTaskInfo, createTask }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={taskInfo.title || ""}
            onChange={(e) => setTaskInfo({ ...taskInfo, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={taskInfo.description || ""}
            onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={taskInfo.completed || false}
            onChange={(e) => setTaskInfo({ ...taskInfo, completed: e.target.checked })}
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
              createTask();
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue text-white hover:bg-blue-dark"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
