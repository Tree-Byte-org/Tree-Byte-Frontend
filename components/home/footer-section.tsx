import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-primary dark:bg-black py-16 mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-black dark:bg-white rounded flex items-center justify-center">
                <span className="text-primary text-xl">
                  <Image src="/favicon.ico" alt="Tree" width={20} height={20} />
                </span>
              </div>
              <span className="text-black dark:text-white font-bold text-2xl">
                TreeByte
              </span>
            </div>
            <p className="text-black/80 dark:text-gray-300 mb-6 leading-relaxed">
              Transforming digital footprints into real environmental impact
              through blockchain-powered reforestation in Costa Rica.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-black dark:text-white font-bold text-lg mb-4">
              Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Our Community */}
          <div>
            <h3 className="text-black dark:text-white font-bold text-lg mb-4">
              Follow Our Community
            </h3>
            <div className="flex space-x-4 mb-6">
              <Instagram className="w-10 h-10 text-black dark:text-white" />
              <Twitter className="w-10 h-10 text-black dark:text-white" />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="text-black/80 dark:text-gray-300">
                • Follow our impact
              </li>
              <li className="text-black/80 dark:text-gray-300">
                • Join the community
              </li>
              <li className="text-black/80 dark:text-gray-300">
                • Get updates
              </li>
              <li className="text-black/80 dark:text-gray-300">
                • Share your trees
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-black dark:text-white font-bold text-lg mb-4">
              Get green news and special actions
            </h3>
            <div className="flex space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-gray-800 border-0 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <Button className="bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-gray-200 text-primary dark:text-gray-900 px-6">
                GO
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/20 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/80 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} TreeByte. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm mt-4 md:mt-0">
            <a
              href="#"
              className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of use
            </a>
            <a
              href="#"
              className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy policy
            </a>
            <a
              href="#"
              className="text-black/80 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
