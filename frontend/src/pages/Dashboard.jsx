import { useState, useEffect, useMemo } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import FilterControls from '../components/FilterControls';

function Dashboard({ user, handleLogout }) {
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filters, setFilters] = useState({ status: '', assignedTo: '' });
    const [isLoading, setIsLoading] = useState(true);

    // Simple role management: if name is "Admin", they are an admin.
    const isAdmin = user === 'Admin';

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await getTasks();
            setAllTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        let tasks = [...allTasks];
        // If user is NOT admin, filter to show only their tasks.
        if (!isAdmin) {
            tasks = tasks.filter(task => task.assignedTo === user);
        }
        // If user IS admin, apply the selected filters.
        else {
            if (filters.status) {
                tasks = tasks.filter(task => task.status === filters.status);
            }
            if (filters.assignedTo) {
                tasks = tasks.filter(task => task.assignedTo === filters.assignedTo);
            }
        }
        setFilteredTasks(tasks);
    }, [filters, allTasks, user, isAdmin]);

    const uniqueAssignees = useMemo(() => {
        const assignees = allTasks.map(task => task.assignedTo);
        return [...new Set(assignees)].sort();
    }, [allTasks]);

    const handleTaskAdded = async (taskData) => {
        try {
            await createTask(taskData);
            fetchTasks();
        } catch (error) { console.error('Failed to add task:', error); }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateTaskStatus(id, status);
            setAllTasks(allTasks.map(t => t._id === id ? { ...t, status } : t));
        } catch (error) { console.error('Failed to update status:', error); }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (error) { console.error('Failed to delete task:', error); }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 via-cyan-400 to-gray-500 p-4 md:p-6">
            <header className="mb-8 flex justify-between items-center">
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Task Manager</h1>
                    <p className="text-white/80 text-lg">Welcome, {user} {isAdmin && '(Admin)'}</p>
                </div>
                <button onClick={handleLogout} className="bg-white/20 text-white font-semibold py-2 px-5 rounded-xl hover:bg-white/40 transition-colors duration-300">
                    Switch User
                </button>
            </header>
            <main className="max-w-7xl mx-auto">
                {isAdmin && (
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <AddTaskForm onTaskAdded={handleTaskAdded} />
                        <FilterControls assignees={uniqueAssignees} onFilterChange={handleFilterChange} />
                    </div>
                )}
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-800 font-medium">Loading tasks...</p>
                        </div>
                    </div>
                ) : (
                    <TaskList
                        tasks={filteredTasks}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDelete}
                        isAdmin={isAdmin}
                    />
                )}
            </main>
        </div>
    );
}

export default Dashboard;