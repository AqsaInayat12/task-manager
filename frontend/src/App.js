
import React from 'react';
import TaskList from './components/TaskList';
import './index.css'; 

function App() {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] font-['Poppins']">
      
      {/* Header section */}
      <header className="text-center mb-10 py-12 px-8 bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/30 max-w-lg mx-auto mt-8 shadow-2xl transition-all hover:bg-white/20">
        <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
          Task Manager
        </h1>
        <p className="text-purple-50 opacity-90 font-medium mt-2 text-base tracking-wide">
          Effortlessly manage your daily goals.
        </p>
      </header>
      
      {/*  Main component */}
      <main className="flex justify-center items-start">
        <div className="w-full max-w-xl">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;