import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, MessageCircle, Instagram, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <AnimatedSection
              animation="fade-up"
              delay={100}
              className="col-span-1 md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-400">
                TreeByte
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming digital footprint into real environmental impact
                through NFTs and regenerative experiences in Costa Rica.
              </p>

              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">
                  Get green news and special tokens
                </h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Links */}
            <AnimatedSection animation="fade-up" delay={300}>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </AnimatedSection>

            {/* Social */}
            <AnimatedSection animation="fade-up" delay={500}>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Follow us for:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Project updates</li>
                  <li>• Special NFT drops</li>
                  <li>• Community events</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 TreeByte. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">
                Terms of use
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
