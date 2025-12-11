import BoardHeader from '@/components/board/BoardHeader';
import KanbanBoard from '@/components/board/KanbanBoard';
import { mockBoard } from '@/data/mockData';

const BoardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <BoardHeader board={mockBoard} />
      <KanbanBoard />
    </div>
  );
};

export default BoardPage;
