import { Board } from '@/types/board';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Settings,
  LayoutDashboard,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface BoardHeaderProps {
  board: Board;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link to="/">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[hsl(262,83%,58%)] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{board.name}</h1>
                <p className="text-sm text-muted-foreground">{board.description}</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                className="pl-9 w-64 bg-secondary border-border"
              />
            </div>

            {/* Filter */}
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            {/* Team members */}
            <div className="flex items-center -space-x-2 ml-2">
              {board.members.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {board.members.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-card">
                  <span className="text-xs font-medium">+{board.members.length - 4}</span>
                </div>
              )}
            </div>

            {/* Invite */}
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BoardHeader;
