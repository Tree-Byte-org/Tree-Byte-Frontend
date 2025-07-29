import { UserCircle } from "lucide-react";

export default function HeaderFeatured() {
  return (
    <header className="border-b ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">TreeByte</div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-sm font-medium text-white">
          <a
            href="#projects"
            className="hover:text-[#90f46f] transition-colors"
          >
            Projects
          </a>
          <a
            href="#benefits"
            className="hover:text-[#90f46f] transition-colors"
          >
            Benefits
          </a>
          <a href="#contact" className="hover:text-[#90f46f] transition-colors">
            Contact
          </a>
          <a href="#about" className="hover:text-[#90f46f] transition-colors">
            About
          </a>
        </nav>

        {/* User icon */}
        <button className="rounded-full p-1 border border-white hover:border-[#90f46f] transition">
          <UserCircle className="w-6 h-6 text-white hover:text-[#90f46f]" />
        </button>
      </div>
    </header>
  );
}
