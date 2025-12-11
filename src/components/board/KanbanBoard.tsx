import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column, Task } from '@/types/board';
import BoardColumn from './BoardColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModl';
import { mockBoard } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(mockBoard.columns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumnByTaskId = (taskId: string): Column | undefined => {
    return columns.find((col) => col.tasks.some((task) => task.id === taskId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const column = findColumnByTaskId(active.id as string);
    if (column) {
      const task = column.tasks.find((t) => t.id === active.id);
      setActiveTask(task || null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = columns.find((col) => col.id === overId) || findColumnByTaskId(overId);

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    setColumns((prev) => {
      const activeTask = activeColumn.tasks.find((t) => t.id === activeId);
      if (!activeTask) return prev;

      return prev.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== activeId),
          };
        }
        if (col.id === overColumn.id) {
          const overTaskIndex = col.tasks.findIndex((t) => t.id === overId);
          const newTasks = [...col.tasks];
          const insertIndex = overTaskIndex >= 0 ? overTaskIndex : newTasks.length;
          newTasks.splice(insertIndex, 0, { ...activeTask, columnId: col.id });
          return {
            ...col,
            tasks: newTasks,
          };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeColumn = findColumnByTaskId(activeId);
    if (!activeColumn) return;

    const activeIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
    const overIndex = activeColumn.tasks.findIndex((t) => t.id === overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: arrayMove(col.tasks, activeIndex, overIndex),
            };
          }
          return col;
        })
      );
    }

    toast({
      title: "Task moved",
      description: "Task has been successfully moved.",
    });
  };

  const handleAddTask = (columnId: string) => {
    setNewTaskColumnId(columnId);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setNewTaskColumnId(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      // Update existing task
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) =>
            t.id === selectedTask.id
              ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      );
      toast({
        title: "Task updated",
        description: "Task has been successfully updated.",
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: taskData.id || `t${Date.now()}`,
        title: taskData.title || '',
        description: taskData.description,
        columnId: newTaskColumnId || 'col1',
        assignees: taskData.assignees || [],
        tags: taskData.tags || [],
        dueDate: taskData.dueDate,
        priority: taskData.priority || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setColumns((prev) =>
        prev.map((col) =>
          col.id === newTask.columnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
      toast({
        title: "Task created",
        description: "New task has been successfully created.",
      });
    }
    setIsModalOpen(false);
    setSelectedTask(null);
    setNewTaskColumnId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-6 overflow-x-auto min-h-[calc(100vh-80px)]">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={column.tasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
          setNewTaskColumnId(null);
        }}
        onSave={handleSaveTask}
        columnId={newTaskColumnId || undefined}
      />
    </DndContext>
  );
};

export default KanbanBoard;
