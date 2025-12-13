import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column, Task } from '@/types/board';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
}

const BoardColumn = ({ column, tasks, onAddTask, onTaskClick }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: column.color }}
          />
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 space-y-3 p-2 rounded-xl min-h-[200px] transition-colors',
          isOver && 'bg-primary/5 ring-2 ring-primary/20 ring-dashed'
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => onTaskClick(task)}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add Task Button */}
      <Button
        variant="ghost"
        className="mt-3 w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => onAddTask(column.id)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add task
      </Button>
    </div>
  );
};

export default BoardColumn;
