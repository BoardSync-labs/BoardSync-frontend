import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/board';
import { Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onDelete?: (taskId: string) => void; // ✅ Add delete callback
}

const priorityColors = {
  low: 'bg-muted',
  medium: 'bg-primary/20 text-primary',
  high: 'bg-orange-500/20 text-orange-400',
  urgent: 'bg-destructive/20 text-destructive',
};

const TaskCard = ({ task, onClick, onDelete }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        'group relative bg-card border border-border rounded-lg p-4 cursor-grab active:cursor-grabbing hover-lift',
        isDragging && 'opacity-50 shadow-xl ring-2 ring-primary'
      )}
    >
      {/* Delete button */}
      {onDelete && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening modal
            onDelete(task.id);
          }}
        >
          ✕
        </button>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
        {task.title}
      </h4>

      {/* Description preview */}
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-3">
          {/* Priority */}
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-medium rounded capitalize',
              priorityColors[task.priority]
            )}
          >
            {task.priority}
          </span>

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          )}
        </div>

        {/* Assignees */}
        {task.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map((user) => (
              <Avatar key={user.id} className="w-6 h-6 border-2 border-card">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-[10px]">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {task.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border-2 border-card">
                <span className="text-[10px] font-medium">+{task.assignees.length - 3}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
