import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

export default function TaskForm({ task, onSaved, onClose }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description: desc, status };
    
    try {
      if (task) {
        await updateTask(task._id, taskData); // Update call
      } else {
        await createTask(taskData); // Create call
      }
      onSaved();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 border border-purple-100">
      <h3 className="text-lg font-bold text-purple-900 mb-4">{task ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-4 bg-purple-50 rounded-xl outline-none text-purple-900"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          className="w-full p-4 bg-purple-50 rounded-xl outline-none text-purple-900"
          placeholder="Details..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-4 bg-purple-50 rounded-xl outline-none text-purple-900"
        >
          <option value="Pending">Pending 🟡</option>
          <option value="In Progress">In Progress 🔵</option>
          <option value="Completed">Completed 🟢</option>
        </select>
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
            {task ? 'Update Changes' : 'Save Task'}
          </button>
          <button type="button" onClick={onClose} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">Cancel</button>
        </div>
      </form>
    </div>
  );
}