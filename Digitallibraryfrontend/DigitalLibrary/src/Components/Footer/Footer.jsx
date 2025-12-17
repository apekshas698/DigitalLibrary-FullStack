import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">DigitalLibrary</h3>
          <p className="text-sm">
            Your one-stop destination for discovering, borrowing, and sharing
            books online. Learn, explore, and grow with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/books" className="hover:text-yellow-400">Books</a></li>
            <li><a href="/categories" className="hover:text-yellow-400">Categories</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Get in Touch</h3>
          <p className="text-sm mb-2">📍 Knowledge City, India</p>
          <p className="text-sm mb-2">📞 +91 9876543210</p>
          <p className="text-sm mb-4">✉️ support@digitallibrary.com</p>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} DigitalLibrary. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
