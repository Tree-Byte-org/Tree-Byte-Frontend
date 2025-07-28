import Image from "next/image";
import { Instagram, MessageCircle, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#7EF45D] px-8 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-16">
          {/* Left Section - Logo and Description */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Image
                src="/icons/logo.png"
                alt="TreeByte Logo"
                width={320}
                height={320}
                className="object-contain"
              />
            </div>

            <p className="text-black text-base leading-relaxed max-w-sm">
              Transforming digital footprint into real environmental impact
              through NFTs and regenerative experiences in Costa Rica.
            </p>

            {/* Email Signup */}
            <div className="space-y-3">
              <p className="text-black font-medium text-base">
                Get green news and special tokens
              </p>
              <div className="flex gap-3 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="space-y-6">
            <h3 className="text-black font-semibold text-lg">Links</h3>
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-black text-base hover:underline"
              >
                About us
              </a>
              <a
                href="#"
                className="block text-black text-base hover:underline"
              >
                How it works
              </a>
              <a
                href="#"
                className="block text-black text-base hover:underline"
              >
                Whitepaper
              </a>
              <a
                href="#"
                className="block text-black text-base hover:underline"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-black text-base hover:underline"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Section - Social Media and Discovery */}
          <div className="space-y-8">
            <div>
              <h3 className="text-black font-semibold text-lg mb-4">
                Follow Our Community!
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <p className="text-black font-medium text-base mb-3">
                And discover:
              </p>
              <ul className="space-y-2">
                <li className="text-black text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Project updates
                </li>
                <li className="text-black text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Special NFT drops
                </li>
                <li className="text-black text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Community events
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
