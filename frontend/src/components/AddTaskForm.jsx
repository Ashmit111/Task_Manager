import React, { useState } from 'react';

const AddTaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !assignedTo) {
            alert('Please fill all fields');
            return;
        }
        onTaskAdded({ title, description, assignedTo, status: 'To do' });
        setTitle('');
        setDescription('');
        setAssignedTo('');
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 w-full transform hover:scale-[1.02] transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Task</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
                </div>

                <div className="relative group">
                    <input
                        id="title"
                        type="text"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    />
                    <label htmlFor="title" className="absolute left-4 -top-3 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-300 group-focus-within:text-blue-600">
                        Task Title
                    </label>
                </div>

                <div className="relative group">
                    <textarea
                        id="description"
                        placeholder=" "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300 resize-none"
                    ></textarea>
                    <label htmlFor="description" className="absolute left-4 -top-3 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-300 group-focus-within:text-blue-600">
                        Description
                    </label>
                </div>

                <div className="relative group">
                    <input
                        id="assignedTo"
                        type="text"
                        placeholder=" "
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    />
                    <label htmlFor="assignedTo" className="absolute left-4 -top-3 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-300 group-focus-within:text-blue-600">
                        Assign To
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Task
                    </span>
                </button>
            </form>
        </div>
    );
};

export default AddTaskForm;