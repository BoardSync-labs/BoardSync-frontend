import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface Invite {
  email: string;
  role: string;
}

const InviteForm = () => {
  const { token } = useParams<{ token: string }>(); // token from URL
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [acceptMode, setAcceptMode] = useState(false);

  useEffect(() => {
    if (token) {
      // If token exists, we are in "invite acceptance" mode
      setAcceptMode(true);
    }
  }, [token]);

  const handleInvite = () => {
    if (!email) return alert("Enter an email");
    setInvites([...invites, { email, role }]);
    setEmail("");
  };

  const handleRevoke = (emailToRevoke: string) => {
    setInvites(invites.filter(inv => inv.email !== emailToRevoke));
  };

  const handleAcceptInvite = () => {
    if (!email) return alert("Enter your email");
    alert(`Invite accepted for ${email} with token: ${token}`);
    navigate("/dashboard"); // Redirect after acceptance
  };

  if (acceptMode) {
    // Invite acceptance view
    return (
      <div className="p-8 max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold">Accept Invite</h1>
        <p>Enter your email to accept the invite:</p>
        <input
          className="border p-1 w-full"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="border px-3 py-1 mt-2" onClick={handleAcceptInvite}>
          Accept Invite
        </button>
      </div>
    );
  }

  // Invite sending view
  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Invite Members</h1>
      <div className="flex gap-2">
        <input
          className="border p-1 flex-1"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button className="border px-3 py-1 flex items-center" onClick={handleInvite}>
          <UserPlus className="w-4 h-4 mr-1" /> Invite
        </button>
      </div>

      {/* Pending invites list */}
      <div>
        {invites.map((inv) => (
          <div key={inv.email} className="flex justify-between items-center p-2 border rounded mb-1">
            <span>{inv.email} - {inv.role}</span>
            <button className="text-red-500 text-sm" onClick={() => handleRevoke(inv.email)}>Revoke</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteForm;
