import React, { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../services/api'; 
import TaskForm from './TaskForm';
import Controls from './Controls'; // Week 3 component

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search state
  const [filterStatus, setFilterStatus] = useState('All'); // Filter state

  const fetchTasks = async () => {
    try {
      const { data } = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to Delete this Task?")) {
      try { await deleteTask(id); fetchTasks(); } catch (err) { console.error(err); }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-500';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-500';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-500';
    }
  };

  // Logic to filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <> {/* Main Parent Wrapper */}
      <Controls 
        tasks={tasks} 
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filterStatus={filterStatus}
        onFilter={setFilterStatus}
      />

      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-purple-900">My Daily Tasks</h2>
          <button 
            onClick={() => { setEditingTask(null); setShowForm(!showForm); }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg"
          >
            {showForm ? '× Close' : '+ Add Task'}
          </button>
        </div>

        {showForm && (
          <div className="mb-10">
            <TaskForm 
              task={editingTask} 
              onSaved={() => { setShowForm(false); fetchTasks(); }} 
              onClose={() => setShowForm(false)} 
            />
          </div>
        )}

        <div className="grid gap-6">
          {/* Use filteredTasks instead of tasks */}
          {filteredTasks.map((task) => (
            <div key={task._id} className={`bg-white/70 p-6 rounded-3xl shadow-md border-l-[12px] flex justify-between items-center ${getStatusStyle(task.status).split(' ')[2]}`}>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full mt-2 inline-block ${getStatusStyle(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { setEditingTask(task); setShowForm(true); }} className="text-blue-500 hover:scale-110 transition">✏️</button>
                <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:scale-110 transition">🗑️</button>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No tasks found matching your search.</p>
          )}
        </div>
      </div>
    </>
  );
}