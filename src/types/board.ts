export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  assignees: User[];
  tags: Tag[];
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  columns: Column[];
  members: User[];
  createdAt: string;
}
