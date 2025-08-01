import Navbar from '../components/home/Navbar';
import UserProfile from '../components/profile/UserProfile';
import CreatePost from '../components/profile/CreatePost';
import Posts from '../components/profile/Posts';
import LikedPosts from '../components/profile/LikedPosts';
import { useState } from 'react';

const ProfilePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts', component: Posts },
    { id: 'liked', label: 'Liked', component: LikedPosts },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Posts;

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
          
          {/* Main content area - full width on mobile */}
          <div className="col-span-1 lg:col-span-5 mt-16 lg:mt-5">
            {/* User Profile Section */}
            <div className="mb-6">
              <UserProfile />
            </div>

            {/* Create Post Section */}
            <div className="mb-6">
              <CreatePost />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 mt-16 lg:mt-5">
            {/* Tabs Section */}
            <div className="mb-6">
              <div className=" rounded-lg shadow-md p-2">
                <div className="flex border-b border-gray-200 mb-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`px-6 py-3 -mb-px text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-[#222831] border-b-2 border-[#222831]'
                          : 'text-gray-500 hover:text-[#393E46]'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Tab Content */}
                <div className="h-[calc(84vh-2rem)] overflow-y-auto pr-0 ">
                  <ActiveComponent />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;