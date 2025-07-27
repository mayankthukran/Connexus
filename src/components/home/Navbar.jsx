import { Link} from "react-router-dom";
import { X, Menu } from "lucide-react"; // Optional: replace with emojis if you don’t use lucide-react

const Navbar = () => {

  return (
    <>
      <nav className="bg-white dark:bg-[#222831] shadow-md rounded-xl mt-6 p-6">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col justify-between items-center gap-20">
          <Link to="/home" className="text-3xl font-bold text-[#948979]">
            Connexus
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-col gap-10 items-center text-xl">
            <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Explore
            </Link>
            <Link to="/saved" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Saved
            </Link>
            <Link to={'/profile'} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Profile
            </Link>
          </div>
          <div className="hidden md:flex mt-60">
            <Link to="/" className="bg-[#948979] text-white px-3 py-1 rounded-md hover:bg-[#DFD0B8]">
                Log out
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
