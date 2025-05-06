// src/pages/HomePage.jsx
import Navbar from '../components/home/Navbar';
import CustomFeed from '../components/home/CustomFeed';
import TopCreators from '../components/home/TopCreators';
import RelatedPosts from '../components/home/RelatedPosts';
import { useState } from 'react';

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile navbar - only visible on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-10 shadow-md p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Connexus</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-white z-10 shadow-md p-4 flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Explore</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Saved</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
          <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded text-center">Logout</a>
        </div>
      )}

      <div className="max-w-screen mx-4 lg:mx-16 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-20">
          {/* Fixed left sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 sticky top-6 self-start">
            <Navbar />
          </div>
          
          {/* Scrollable middle feed - full width on mobile */}
          <div className="col-span-1 lg:col-span-5 mt-16 lg:mt-0">
            <div className="h-[calc(100vh-5rem)] lg:h-[calc(100vh-3rem)] overflow-y-auto pr-0 lg:pr-2">
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