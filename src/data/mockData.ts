import { Board, User, Tag, Task, Column } from '@/types/board';

export const mockUsers: User[] = [
  { id: '1', name: 'Alex Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', email: 'alex@example.com' },
  { id: '2', name: 'Sarah Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', email: 'sarah@example.com' },
  { id: '3', name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', email: 'james@example.com' },
  { id: '4', name: 'Emily Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', email: 'emily@example.com' },
];

export const mockTags: Tag[] = [
  { id: '1', name: 'Feature', color: 'hsl(199, 89%, 48%)' },
  { id: '2', name: 'Bug', color: 'hsl(0, 84%, 60%)' },
  { id: '3', name: 'Enhancement', color: 'hsl(262, 83%, 58%)' },
  { id: '4', name: 'Documentation', color: 'hsl(142, 71%, 45%)' },
  { id: '5', name: 'Design', color: 'hsl(45, 93%, 47%)' },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Design new dashboard layout',
    description: 'Create wireframes and high-fidelity mockups for the analytics dashboard',
    columnId: 'col1',
    assignees: [mockUsers[0], mockUsers[1]],
    tags: [mockTags[4], mockTags[0]],
    dueDate: '2024-02-15',
    priority: 'high',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
  },
  {
    id: 't2',
    title: 'Implement authentication flow',
    description: 'Set up JWT-based authentication with refresh tokens',
    columnId: 'col1',
    assignees: [mockUsers[2]],
    tags: [mockTags[0]],
    dueDate: '2024-02-10',
    priority: 'urgent',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-11',
  },
  {
    id: 't3',
    title: 'Fix navigation bug on mobile',
    description: 'Menu items not clickable on iOS Safari',
    columnId: 'col2',
    assignees: [mockUsers[1]],
    tags: [mockTags[1]],
    dueDate: '2024-02-05',
    priority: 'medium',
    createdAt: '2024-01-09',
    updatedAt: '2024-01-09',
  },
  {
    id: 't4',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples',
    columnId: 'col2',
    assignees: [mockUsers[3]],
    tags: [mockTags[3]],
    dueDate: '2024-02-20',
    priority: 'low',
    createdAt: '2024-01-07',
    updatedAt: '2024-01-10',
  },
  {
    id: 't5',
    title: 'Optimize database queries',
    description: 'Improve performance of dashboard data fetching',
    columnId: 'col3',
    assignees: [mockUsers[2], mockUsers[0]],
    tags: [mockTags[2]],
    priority: 'medium',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-08',
  },
  {
    id: 't6',
    title: 'Add dark mode support',
    description: 'Implement theme switching with system preference detection',
    columnId: 'col4',
    assignees: [mockUsers[0]],
    tags: [mockTags[0], mockTags[4]],
    priority: 'low',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-06',
  },
];

export const mockColumns: Column[] = [
  { id: 'col1', title: 'Backlog', color: 'hsl(215, 20%, 55%)', tasks: mockTasks.filter(t => t.columnId === 'col1') },
  { id: 'col2', title: 'In Progress', color: 'hsl(199, 89%, 48%)', tasks: mockTasks.filter(t => t.columnId === 'col2') },
  { id: 'col3', title: 'Review', color: 'hsl(262, 83%, 58%)', tasks: mockTasks.filter(t => t.columnId === 'col3') },
  { id: 'col4', title: 'Done', color: 'hsl(142, 71%, 45%)', tasks: mockTasks.filter(t => t.columnId === 'col4') },
];

export const mockBoard: Board = {
  id: 'board1',
  name: 'Product Development',
  description: 'Main product development board for Q1 2024',
  columns: mockColumns,
  members: mockUsers,
  createdAt: '2024-01-01',
};
