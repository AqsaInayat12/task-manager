import React from 'react';

export default function Controls({ tasks, onSearch, onFilter, searchTerm, filterStatus }) {
  // Progress calculate karne ka logic
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 mb-8">
      {/* Progress Bar */}
      <div className="mb-6 bg-white/50 p-5 rounded-3xl shadow-sm border border-purple-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold text-purple-800">Overall Progress</span>
          <span className="text-sm font-bold text-purple-800">{percent}%</span>
        </div>
        <div className="w-full bg-purple-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-purple-600 h-full transition-all duration-700 ease-in-out"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="text-xs text-purple-500 mt-2 font-medium italic">
          {completed} of {total} tasks completed
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          placeholder="🔍 Search by title..."
          className="flex-1 p-4 rounded-2xl border-none bg-white shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select 
          className="p-4 rounded-2xl border-none bg-white shadow-md focus:ring-2 focus:ring-purple-400 outline-none text-purple-700 font-bold"
          value={filterStatus}
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending 🟡</option>
          <option value="In Progress">In Progress 🔵</option>
          <option value="Completed">Completed 🟢</option>
        </select>
      </div>
    </div>
  );
}