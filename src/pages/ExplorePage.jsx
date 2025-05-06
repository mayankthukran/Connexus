import Navbar from '../components/home/Navbar';
import Search from '../components/explore/Search';
import UserProfiles from '../components/explore/UserProfiles';
import PopularToday from '../components/explore/PopularToday';
import { useState } from 'react';

const ExplorePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const userResponse = await fetch(`https://randomuser.me/api/?results=20`);
      if (!userResponse.ok) throw new Error("Failed to fetch users");
      const userData = await userResponse.json();
      
      const filteredResults = userData.results
        .filter(user => 
          user.login.username.includes(query.toLowerCase()) || 
          `${user.name.first} ${user.name.last}`.toLowerCase().includes(query.toLowerCase())
        )
        .map((user, index) => ({
          id: `search-${index}`,
          username: user.login.username,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.picture.medium,
          email: user.email,
          location: `${user.location.city}, ${user.location.country}`,
          followers: Math.floor(Math.random() * 5000),
          following: Math.floor(Math.random() * 500)
        }));
      
      setSearchResults(filteredResults);
    } catch (err) {
      console.error("Error searching users:", err);
      setError("Failed to search users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

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

      <div className="max-w-screen mx-4 lg:mx-16 py-6 sm:px-6 lg:px-8 max-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-20">
          {/* Fixed left sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 sticky top-6 self-start">
            <Navbar />
          </div>
          
          {/* Scrollable middle feed - full width on mobile */}
          <div className="lg:col-span-5 mt-16 lg:mt-6">
            <div className="bg-white rounded-lg shadow p-6 mb-8 dark:bg-gray-800 h-[calc(100vh-5rem)] lg:h-[calc(100vh-3rem)] overflow-y-auto pr-0 lg:pr-2">
              <Search 
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onClear={clearSearch}
              />
              
              {isLoading && (
                <div className="flex justify-center my-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {error && (
                <div className="p-4 mt-4 bg-red-50 text-red-600 rounded-lg">
                  <p>{error}</p>
                  <button 
                    onClick={() => handleSearch(searchQuery)} 
                    className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              )}
              
              {searchQuery && !isLoading && !error && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                  {searchResults.length > 0 ? (
                    <UserProfiles users={searchResults} />
                  ) : (
                    <p className="text-gray-500 py-4">No results found for "{searchQuery}"</p>
                  )}
                </div>
              )}
              
              {!searchQuery && !error && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Suggested Users</h2>
                  {/* Using empty users prop so component will fetch from APIs */}
                  <UserProfiles />
                </div>
              )}
            </div>
          </div>
          
          {/* Fixed right sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3 sticky mt-6 self-start">
            <div className="mb-6 h-[calc(100vh-5rem)] lg:h-[calc(100vh-3rem)] overflow-y-auto pr-0 lg:pr-2">
              <PopularToday />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;