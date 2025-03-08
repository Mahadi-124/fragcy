import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, tasks } = useTaskContext();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">TaskShare</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end">
                <div className="flex space-x-2">
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  <div className="flex items-center space-x-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {pendingTasks} pending
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      {completedTasks} completed
                    </span>
                  </div>
                </div>
              </div>
              {currentUser.avatar && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;