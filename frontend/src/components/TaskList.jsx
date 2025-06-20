import React from 'react';

const TaskList = ({ tasks, onUpdateStatus, onDelete, isAdmin }) => {
    const statusOptions = ['To do', 'In progress', 'Done'];

    const getStatusColor = (status) => {
        switch (status) {
            case 'To do': return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
            case 'In progress': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300';
            case 'Done': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300';
            default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'To do': return '📋';
            case 'In progress': return '⚡';
            case 'Done': return '✅';
            default: return '📋';
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-xl text-gray-700 font-medium mb-2">No tasks found</p>
                    <p className="text-gray-500">There are no tasks assigned to you, or your filters returned no results.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="bg-white/95 backdrop-blur-sm rounded-4xl shadow-lg border border-white/20 p-6 flex flex-col justify-between transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group"
                >
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
                                {task.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(task.status)} shadow-sm flex-shrink-0`}>
                                {getStatusIcon(task.status)} {task.status}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                            {task.description}
                        </p>

                        <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-xl border">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                                {task.assignedTo.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">{task.assignedTo}</p>
                                <p className="text-xs text-gray-500">Assignee</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                        {/* Status dropdown is now visible to all users for their tasks */}
                        <div className="relative flex-1 group/select">
                            <select
                                value={task.status}
                                onChange={(e) => onUpdateStatus(task._id, e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white cursor-pointer transition-all duration-300 hover:border-gray-300 appearance-none pr-10"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {getStatusIcon(option)} {option}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400 group-hover/select:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Delete button is still only visible to admins */}
                        {isAdmin && (
                            <button
                                onClick={() => onDelete(task._id)}
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-300 group/delete"
                            >
                                <svg className="w-4 h-4 group-hover/delete:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;