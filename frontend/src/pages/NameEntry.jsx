import React, { useState } from 'react';

const NameEntry = ({ onNameSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        } else {
            alert("Please enter a name.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome to Task Manager</h2>
                <p className="text-gray-600 mb-8">Please enter your name to view your tasks.</p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-300 text-center text-lg"
                    />
                </div>
                <button type="submit" className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default NameEntry;