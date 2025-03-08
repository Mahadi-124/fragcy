import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <AddTaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;