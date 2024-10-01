import React, { useState, useEffect } from 'react';
import { FaTrash, FaClock } from 'react-icons/fa';

export default function TaskList() {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const updateTasksFromLocalStorage = () => {
      const storedData = localStorage.getItem('formDatas');
      const parsedData = storedData ? JSON.parse(storedData) : {};
      setTasks(parsedData);
    };

    updateTasksFromLocalStorage();

    const storageEventListener = (e) => {
      if (e.key === 'formDatas') {
        updateTasksFromLocalStorage();
      }
    };

    window.addEventListener('storage', storageEventListener);

    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, [tasks]);

  const handleDeleteTask = (taskTitle) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskTitle];

    setTasks(updatedTasks);
    localStorage.setItem('formDatas', JSON.stringify(updatedTasks));
  };

  const handleMarkComplete = (taskTitle) => {
    const updatedTasks = { ...tasks };
    updatedTasks[taskTitle].isComplete = true;

    setTasks(updatedTasks);
    localStorage.setItem('formDatas', JSON.stringify(updatedTasks));
  };

  return (
    <div className="fixed right-0 top-0 w-3/4 p-4 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Task List</h2>
      <ul className=" p-4 rounded-lg">
        {Object.keys(tasks).map((taskTitle) => {
          const task = tasks[taskTitle];
          return (
            <li key={taskTitle} className="mb-4 p-4 bg-white bg-opacity-60 text-black border border-blue-600 rounded-lg">
              <div className="flex items-center mb-2">
                {task.isComplete ? (
                  <span className="text-green-600 inline-block">
                    <FaClock className="mr-2" />
                    <p className="text-sm">Completed</p>
                  </span>
                ) : (
                  <span className="text-red-600 inline-block">
                    <FaClock className="mr-2" />
                    <p className="text-sm">Pending</p>
                  </span>
                )}
              </div>
              <div>
                <strong>Project Title:</strong> {task.projectTitle}
              </div>
              <div>
                <strong>Task:</strong> {task.task}
              </div>
              <div>
                <strong>Assignee:</strong> {task.assignee}
              </div>
              {task.isComplete ? (
                <div className="mt-2">
                  <button
                    onClick={() => handleDeleteTask(taskTitle)}
                    className="px-2 py-1 text-red-600 bg-red-100 rounded-lg"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    onClick={() => handleMarkComplete(taskTitle)}
                    className="px-2 py-1 text-white bg-green-500 rounded-lg"
                  >
                    Mark as Complete
                  </button>
                  <button
                    onClick={() => handleDeleteTask(taskTitle)}
                    className="px-2 py-1 text-red-600 bg-red-100 rounded-lg ml-2"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
