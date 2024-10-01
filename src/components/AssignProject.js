import React, { useState } from 'react';

export default function AssignProject() {
  const [formData, setFormData] = useState({
    projectTitle: '',
    task: '',
    assignee: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = localStorage.getItem('formDatas');
    const parsedExistingData = existingData ? JSON.parse(existingData) : {};
    const updatedData = {
      ...parsedExistingData,
      [formData.projectTitle]: formData,
    };
    localStorage.setItem('formDatas', JSON.stringify(updatedData));
    console.log(updatedData);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h1 className="text-3xl text-black flex justify-center">Project Management Tool</h1>
      <div className="max-w-md mt-5 mx-auto bg-white bg-opacity-80 p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectTitle" className="text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="task" className="text-sm font-medium text-gray-700">
              Task
            </label>
            <input
              type="text"
              id="task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="assignee" className="text-sm font-medium text-gray-700">
              Whom to Assign Task
            </label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
