import React from 'react';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="text-center mb-10 py-8 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 max-w-2xl mx-auto mt-10">
        <h1 className="text-5xl font-black text-purple-900 tracking-tight">Task Manager</h1>
        <p className="text-purple-700 font-medium mt-2">Organize your day in lavender style</p>
      </header>
      
      <main className="container mx-auto">
        <TaskList />
      </main>
    </div>
  );
}

export default App;