import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-[#d0f0c0] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-black">
          Watermelon
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-black hover:text-gray-700 transition"
            >
              {item.label}
            </a>
          ))}

          {/* Login Button */}
          <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#d0f0c0] shadow-md px-6 pb-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-black hover:text-gray-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Login Button */}
          <button
            className="w-full px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
