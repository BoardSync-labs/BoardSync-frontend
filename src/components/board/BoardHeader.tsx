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
import { useState } from "react";

interface BoardHeaderProps {
  board: Board;
}

interface Invite {
  email: string;
  role: string;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [invites, setInvites] = useState<Invite[]>([]);

  const handleInvite = () => {
    if (!email) return alert("Enter an email");
    setInvites([...invites, { email, role }]);
    setEmail("");
  };

  const handleRevoke = (emailToRevoke: string) => {
    setInvites(invites.filter(inv => inv.email !== emailToRevoke));
  };

  return (
    <>
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
              <Button variant="outline" size="sm" onClick={() => setInviteOpen(true)}>
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

     {/* Invite Modal */}
{inviteOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-black font-bold hover:text-gray-700"
        onClick={() => setInviteOpen(false)}
      >
        ✕
      </button>

      {/* Modal title */}
      <h2 className="text-xl font-bold mb-4 text-black">Invite Members</h2>

      {/* Form */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="email"
          placeholder="Enter email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button
          onClick={handleInvite}
          className="flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          <UserPlus className="w-4 h-4 mr-1" /> Invite
        </button>
      </div>

      {/* Pending invites */}
      <div className="max-h-64 overflow-y-auto text-black">
        {invites.map((inv) => (
          <div
            key={inv.email}
            className="flex justify-between items-center p-2 border rounded mb-2"
          >
            <span className="text-black">{inv.email} - {inv.role}</span>
            <button
              className="text-red-500 text-sm hover:underline"
              onClick={() => handleRevoke(inv.email)}
            >
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default BoardHeader;
