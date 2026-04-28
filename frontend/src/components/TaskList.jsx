import React, { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../services/api'; 
import TaskForm from './TaskForm';
import Controls from './Controls';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Controls 
        tasks={tasks} 
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filterStatus={filterStatus}
        onFilter={setFilterStatus}
      />

      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">My Daily Tasks</h2>
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
          {filteredTasks.map((task) => (
            <div key={task._id} className={`bg-white/90 p-6 rounded-3xl shadow-md border-l-[12px] flex justify-between items-center ${getStatusStyle(task.status).split(' ')[2]}`}>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mb-2">{task.description}</p>
                
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                  
                  {/* 📅 Due Date is added here */}
                  {task.dueDate && (
                    <span className="text-purple-900 text-xs font-semibold bg-purple-100 px-2 py-1 rounded-lg">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 ml-4">
                <button onClick={() => { setEditingTask(task); setShowForm(true); }} className="text-blue-500 hover:scale-120 transition">✏️</button>
                <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:scale-120 transition">🗑️</button>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <p className="text-white text-center mt-10 text-lg font-medium opacity-90">
              No tasks found matching your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
}