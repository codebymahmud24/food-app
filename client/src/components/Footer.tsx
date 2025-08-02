import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-8 mt-1 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-2xl tracking-wide">🍕 FoodApp</span>
          <span className="text-sm mt-1 opacity-80">
            Delicious food, delivered fast.
          </span>
        </div>
        <div className="flex gap-6 text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-200 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-200 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-200 transition"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="text-xs opacity-80 text-center md:text-right">
          &copy; {new Date().getFullYear()} FoodApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;