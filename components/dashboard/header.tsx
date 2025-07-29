import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#FAFDF6] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-green-950">TreeByte</div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-800">
          <a
            href="#projects"
            className="hover:text-green-900 transition-colors"
          >
            Projects
          </a>
          <a
            href="#benefits"
            className="hover:text-green-900 transition-colors"
          >
            Benefits
          </a>
          <a href="#contact" className="hover:text-green-900 transition-colors">
            Contact
          </a>
          <a href="#about" className="hover:text-green-900 transition-colors">
            About
          </a>
        </nav>

        <button className="rounded-full p-1 border border-black">
          <UserCircle className="w-6 h-6 text-black" />
        </button>
      </div>
    </header>
  );
}
