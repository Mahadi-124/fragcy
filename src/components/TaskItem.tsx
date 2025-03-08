import React, { useState } from 'react';
import { Task, User } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle, Circle, Edit, Trash2, MessageSquare, DollarSign, Users } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { users, currentUser, toggleTaskStatus, updateTask, deleteTask, addNote } = useTaskContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [newNote, setNewNote] = useState('');
  const [showAssignees, setShowAssignees] = useState(false);

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const handleSaveEdit = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(task.id, newNote);
      setNewNote('');
    }
  };

  const handleToggleAssignee = (userId: string) => {
    const currentAssignees = editedTask.assignedTo || [];
    const updatedAssignees = currentAssignees.includes(userId)
      ? currentAssignees.filter(id => id !== userId)
      : [...currentAssignees, userId];
    
    setEditedTask({
      ...editedTask,
      assignedTo: updatedAssignees
    });
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button 
              onClick={() => toggleTaskStatus(task.id)}
              className="mt-1 text-blue-500 hover:text-blue-700"
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />
              ) : (
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
              )}
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-x-4">
                {task.amount !== undefined && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-24 p-1 border rounded"
                        value={editedTask.amount || ''}
                        onChange={(e) => setEditedTask({ ...editedTask, amount: parseFloat(e.target.value) || undefined })}
                      />
                    ) : (
                      <span>${task.amount.toFixed(2)}</span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{task.notes.length} notes</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{task.assignedTo?.length || 0} assignees</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTask(task);
                  }}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            
            <div className="mt-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                <button
                  type="button"
                  onClick={() => setShowAssignees(!showAssignees)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  {showAssignees ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showAssignees && (
                <div className="mt-2 space-y-2">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={(editedTask.assignedTo || []).includes(user.id)}
                        onChange={() => handleToggleAssignee(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`user-${user.id}`} className="flex items-center">
                        {user.avatar && (
                          <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full mr-2" />
                        )}
                        <span className="text-sm text-gray-700">{user.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? 'Hide details' : 'Show details'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t px-4 py-3 bg-gray-50">
          <div className="mb-3">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </div>
          
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="mb-3">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Assigned to</h4>
              <div className="flex flex-wrap gap-2">
                {task.assignedTo.map(userId => {
                  const user = getUserById(userId);
                  return user ? (
                    <div key={userId} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="h-5 w-5 rounded-full mr-2" />
                      )}
                      <span className="text-xs text-gray-700">{user.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Notes</h4>
            {task.notes.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No notes yet</p>
            ) : (
              <div className="space-y-2 mb-3">
                {task.notes.map(note => {
                  const user = getUserById(note.userId);
                  return (
                    <div key={note.id} className="bg-white p-2 rounded border text-sm">
                      <div className="flex items-center mb-1">
                        {user?.avatar && (
                          <img src={user.avatar} alt={user.name} className="h-5 w-5 rounded-full mr-2" />
                        )}
                        <span className="font-medium text-gray-700">{user?.name || 'Unknown user'}</span>
                        <span className="text-gray-400 text-xs ml-2">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{note.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Add a note..."
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddNote();
                  }
                }}
              />
              <button
                onClick={handleAddNote}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;