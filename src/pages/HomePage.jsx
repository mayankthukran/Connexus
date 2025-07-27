import Navbar from '../components/home/Navbar';
import CustomFeed from '../components/home/CustomFeed';
import TopCreators from '../components/home/TopCreators';
import RelatedPosts from '../components/home/RelatedPosts';
import { useState } from 'react';

const HomePage = () => {
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

      <div className="max-w-screen mx-4  py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-15">
          {/* Fixed left sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 sticky top-6 self-start">
            <Navbar />
          </div>
          
          {/* Scrollable middle feed - full width on mobile */}
          <div className="col-span-1 lg:col-span-5 mt-16 lg:mt-0">
            <div className="h-[calc(100vh-5rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto pr-0 lg:pr-2">
              <CustomFeed />
            </div>
          </div>
          
          {/* Fixed right sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3 sticky top-6 self-start">
            <div className="mb-6">
              <TopCreators />
            </div>
            <div className="h-[calc(50vh-3rem)] overflow-y-auto">
              <RelatedPosts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;