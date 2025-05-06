import { Link} from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react"; // Optional: replace with emojis if you don’t use lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = "123"; // Replace with logged-in user ID from context or auth

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md rounded-xl mt-6 p-6">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col justify-between items-center gap-20">
          <Link to="/home" className="text-2xl font-bold text-blue-600">
            Connexus
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-col gap-10 items-center">
            <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Explore
            </Link>
            <Link to="/saved" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Saved
            </Link>
            <Link to={`/profile/${userId}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Profile
            </Link>
          </div>
          <div className="hidden md:flex mt-60">
            <Link to="/" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                Logout
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 z-50 shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-blue-600">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col px-4 py-6 gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
            Home
          </Link>
          <Link to="/explore" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
            Explore
          </Link>
          <Link to="/saved" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
            Saved
          </Link>
          <Link to={`/profile/${userId}`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-200 hover:text-blue-500">
            Profile
          </Link>
          <Link to="/auth" onClick={() => setIsOpen(false)} className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 text-center">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
