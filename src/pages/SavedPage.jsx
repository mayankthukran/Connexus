import Navbar from '../components/home/Navbar';
import SavedPosts from '../components/saved/SavedPosts'
import { useState } from 'react';

const SavedPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#DFD0B8]">
      {/* Mobile navbar - only visible on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#222831] z-10 shadow-md p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#948979]">Connexus</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#948979] hover:text-[#DFD0B8]"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-14 left-30 right-0 bg-[#222831] z-10 shadow-md p-4 flex flex-col gap-4 text-center">
          <a href="/home" className="text-[#948979] hover:text-blue-600">Home</a>
          <a href="/explore" className="text-[#948979] hover:text-blue-600">Explore</a>
          <a href="/saved" className="text-[#948979] hover:text-blue-600">Saved</a>
          <a href="profile" className="text-[#948979] hover:text-blue-600">Profile</a>
          <a href="/" className="bg-[#948979] text-white px-4 py-2 rounded text-center">Logout</a>
        </div>
      )}

      <div className="max-w-screen mx-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-15">
          {/* Fixed left sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 sticky top-6 self-start">
            <Navbar />
          </div>
          
          {/* Scrollable middle content - full width on mobile */}
          <div className="col-span-1 lg:col-span-8 mt-16 lg:mt-5">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Saved Posts</h2>
              <p className="text-gray-600">Your collection of saved posts</p>
            </div>
            <div className="h-[calc(100vh-8rem)] lg:h-[calc(90vh-6rem)] overflow-y-auto pr-0 lg:pr-2">
              <SavedPosts />
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default SavedPage;