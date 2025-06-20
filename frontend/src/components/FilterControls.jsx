import React from 'react';

const FilterControls = ({ assignees, onFilterChange }) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 w-full transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Filter Tasks</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto"></div>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <select
                        onChange={(e) => onFilterChange('assignedTo', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white cursor-pointer transition-all duration-300 hover:border-gray-300 appearance-none pr-12"
                    >
                        <option value="">All Assignees</option>
                        {assignees.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <label className="absolute left-4 -top-3 bg-white px-2 text-sm font-medium text-gray-600">
                        Filter by Assignee
                    </label>
                </div>

                <div className="relative group">
                    <select
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white cursor-pointer transition-all duration-300 hover:border-gray-300 appearance-none pr-12"
                    >
                        <option value="">All Statuses</option>
                        <option value="To do">📋 To do</option>
                        <option value="In progress">⚡ In progress</option>
                        <option value="Done">✅ Done</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <label className="absolute left-4 -top-3 bg-white px-2 text-sm font-medium text-gray-600">
                        Filter by Status
                    </label>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => {
                            onFilterChange('assignedTo', '');
                            onFilterChange('status', '');
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-2 border-transparent hover:border-gray-300"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterControls;