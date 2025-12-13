import { Task, User, Tag } from '@/types/board';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Tag as TagIcon, Users, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mockUsers, mockTags } from '@/data/mockData';

interface TaskModalProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  columnId?: string;
}

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-muted' },
  { value: 'medium', label: 'Medium', color: 'bg-primary/20' },
  { value: 'high', label: 'High', color: 'bg-orange-500/20' },
  { value: 'urgent', label: 'Urgent', color: 'bg-destructive/20' },
];

const TaskModal = ({ task, isOpen, onClose, onSave, columnId }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(task?.priority || 'medium');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(task?.tags || []);
  const [selectedAssignees, setSelectedAssignees] = useState<User[]>(task?.assignees || []);
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSave = () => {
    onSave({
      id: task?.id || `t${Date.now()}`,
      title,
      description,
      priority,
      tags: selectedTags,
      assignees: selectedAssignees,
      dueDate: dueDate || undefined,
      columnId: task?.columnId || columnId || 'col1',
    });
    onClose();
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.find(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const toggleAssignee = (user: User) => {
    setSelectedAssignees(prev =>
      prev.find(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {task ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="bg-secondary border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="bg-secondary border-border min-h-[100px]"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Priority
            </Label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriority(option.value as Task['priority'])}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                    option.color,
                    priority === option.value 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' 
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <TagIcon className="w-4 h-4" />
              Tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                    selectedTags.find(t => t.id === tag.id)
                      ? 'ring-2 ring-offset-2 ring-offset-card ring-current'
                      : 'opacity-60 hover:opacity-100'
                  )}
                  style={{ 
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Assignees */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Assignees
            </Label>
            <div className="flex flex-wrap gap-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => toggleAssignee(user)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary transition-all',
                    selectedAssignees.find(u => u.id === user.id)
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-[10px]">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-secondary border-border w-48"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {task ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
