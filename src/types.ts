export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  amount?: number;
  completed: boolean;
  createdAt: string;
  createdBy: string;
  notes: Note[];
  assignedTo?: string[];
}

export type TaskStatus = 'all' | 'pending' | 'completed';