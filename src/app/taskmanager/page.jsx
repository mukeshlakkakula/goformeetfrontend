"use client";

import { useState, useEffect } from "react";
import { fetchTasks, addTasks, editTasks, deleteTasks } from "../Api/task.js";
import Navbar from "@/components/Navbar.js";
import Cookies from "js-cookie";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState(""); // Filter by status
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
  });

  useEffect(() => {
    if (Cookies.get("jwt_token")) {
      loadTasks();
    }
  }, []);

  useEffect(() => {
    applyFilter();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const applyFilter = () => {
    if (filter) {
      setFilteredTasks(tasks.filter((task) => task.status === filter));
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleSaveTask = async () => {
    try {
      if (editingTask) {
        await editTasks(editingTask._id, taskData);
      } else {
        await addTasks(taskData);
      }
      setShowModal(false);
      setEditingTask(null);
      setTaskData({ title: "", description: "", status: "To Do", dueDate: "" });
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTasks(id);
      loadTasks();
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setShowModal(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setTaskData({ title: "", description: "", status: "To Do", dueDate: "" });
    setShowModal(true);
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <>
      {" "}
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

        {/* Add Task Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddTask}
          >
            + Add Task
          </button>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        {currentTasks.length === 0 ? (
          "No Task is added"
        ) : (
          <ul className="mt-4 space-y-4">
            {currentTasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <strong>{task.title}</strong>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Status: {task.status} | Due:{" "}
                    {task.dueDate ? task.dueDate.split("T")[0] : "N/A"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from(
            { length: Math.ceil(filteredTasks.length / tasksPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>

        {/* Task Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                {editingTask ? "Edit Task" : "Add Task"}
              </h2>
              <input
                type="text"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="Task Description"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <select
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({ ...taskData, status: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) =>
                  setTaskData({ ...taskData, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleSaveTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskManager;
