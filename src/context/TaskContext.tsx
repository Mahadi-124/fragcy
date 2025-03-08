import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, User, Note } from '../types';

// Mock current user - in a real app, this would come from authentication
const currentUser: User = {
  id: 'user-1',
  name: 'Current User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

// Mock users for sharing
const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-3',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Initial tasks
const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete project proposal',
    description: 'Draft the initial project proposal with budget estimates',
    amount: 1500,
    completed: false,
    createdAt: new Date().toISOString(),
    createdBy: 'user-1',
    notes: [
      {
        id: 'note-1',
        content: 'Added initial draft',
        createdAt: new Date().toISOString(),
        userId: 'user-1'
      }
    ],
    assignedTo: ['user-1', 'user-2']
  },
  {
    id: 'task-2',
    title: 'Review client feedback',
    description: 'Go through client feedback and make necessary adjustments',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: 'user-2',
    notes: [],
    assignedTo: ['user-1', 'user-3']
  }
];

interface TaskContextType {
  tasks: Task[];
  users: User[];
  currentUser: User;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'createdBy' | 'notes'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addNote: (taskId: string, content: string) => void;
  toggleTaskStatus: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'createdBy' | 'notes'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.id,
      notes: []
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addNote = (taskId: string, content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      userId: currentUser.id
    };

    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, notes: [...task.notes, newNote] } 
        : task
    ));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      users, 
      currentUser,
      addTask, 
      updateTask, 
      deleteTask, 
      addNote,
      toggleTaskStatus
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};