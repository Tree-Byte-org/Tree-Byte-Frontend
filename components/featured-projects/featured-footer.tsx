import Image from "next/image";
import { Instagram, MessageCircle, Twitter, Mail } from "lucide-react";

export default function FooterFeatured() {
  return (
    <footer className="bg-[#0d0f0a] pt-16">
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-16 pb-16">
          {/* Left Section - Logo and Description */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Image
                src="/icons/logo-tree.png"
                alt="TreeByte Logo"
                width={160}
                height={160}
                className="object-contain"
              />
              <h2 className="text-white text-2xl font-bold">TreeByte</h2>
            </div>

            <p className="text-white text-base leading-relaxed max-w-sm">
              Transforming digital footprint into real environmental impact
              through NFTs and regenerative experiences in Costa Rica.
            </p>

            {/* Email Signup */}
            <div className="space-y-3">
              <p className="text-white font-semibold text-base">
                Get green news and special tokens
              </p>
              <div className="flex gap-3 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  className="flex-1 px-4 py-3 text-base border border-white/30 rounded-md bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button className="bg-[#90f46f] p-3 rounded-md hover:bg-[#77dd55] transition-colors">
                  <Mail className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="space-y-6">
            <h3 className="text-[#90f46f] font-semibold text-lg">Links</h3>
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-white text-base hover:underline"
              >
                About us
              </a>
              <a
                href="#"
                className="block text-white text-base hover:underline"
              >
                How it works
              </a>
              <a
                href="#"
                className="block text-white text-base hover:underline"
              >
                Whitepaper
              </a>
              <a
                href="#"
                className="block text-white text-base hover:underline"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-white text-base hover:underline"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Section - Social Media and Discovery */}
          <div className="space-y-8">
            <div>
              <h3 className="text-[#90f46f] font-semibold text-lg mb-4">
                Follow Our Community!
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white text-black p-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white text-black p-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white text-black p-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-base mb-3">
                And discover:
              </p>
              <ul className="space-y-2">
                <li className="text-white text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Project updates
                </li>
                <li className="text-white text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Special NFT drops
                </li>
                <li className="text-white text-base flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Community events
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1f1f1f] py-6 text-white text-sm flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        <p>© 2024 Tree Byte. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            Terms of use
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
