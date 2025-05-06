import React, { useState, useEffect } from 'react';

const PopularToday = () => {
  const [popularTabs, setPopularTabs] = useState([
    { id: 'trending', label: 'Trending', active: true },
    { id: 'newest', label: 'Newest', active: false },
    { id: 'following', label: 'Following', active: false },
  ]);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [userRes, photoRes] = await Promise.all([
        fetch("https://randomuser.me/api/?results=15"),
        fetch("https://jsonplaceholder.typicode.com/photos?_limit=15"),
      ]);

      if (!userRes.ok || !photoRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const users = await userRes.json();
      const photos = await photoRes.json();

      const combined = users.results.map((user, i) => ({
        id: `post-${i}`,
        user,
        photo: photos[i],
        likes: Math.floor(Math.random() * 2000) + 100,
        comments: Math.floor(Math.random() * 200) + 10,
        category: i % 3 === 0 ? 'trending' : (i % 3 === 1 ? 'newest' : 'following')
      }));

      const trendingPosts = [...combined].filter(p => p.category === 'trending').sort((a, b) => b.likes - a.likes);
      const newestPosts = [...combined].filter(p => p.category === 'newest').sort((a, b) => b.timestamp - a.timestamp);
      const followingPosts = [...combined].filter(p => p.category === 'following');
      
      setPosts([...trendingPosts, ...newestPosts, ...followingPosts]);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setError("Failed to load content. Please try again.");
      setLoading(false);
    }
  };
  
  const switchTab = (tabId) => {
    setPopularTabs(
      popularTabs.map(tab => ({
        ...tab,
        active: tab.id === tabId
      }))
    );
  };
  
  const getActiveTabContent = () => {
    const activeTab = popularTabs.find(tab => tab.active);
    return posts.filter(post => post.category === activeTab.id);
  };
  
  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Popular Today</h2>
        <div className="flex border-b mb-4">
          {popularTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                tab.active
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-center py-6 text-gray-500">Loading popular posts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Popular Today</h2>
        <div className="flex border-b mb-4">
          {popularTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                tab.active
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-center py-6">
          <p className="text-red-500 mb-3">{error}</p>
          <button 
            onClick={fetchPosts}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const activeContent = getActiveTabContent();
  
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Popular Today</h2>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {popularTabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 -mb-px text-sm font-medium ${
              tab.active
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      {activeContent.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No content to display</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeContent.map((post,index) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 p-4 transition hover:shadow-md"
            >
              {/* Post image */}
              <img
                src={`https://picsum.photos/200/300?random=${index+1}`}
                alt={post.photo.title}
                className="rounded-md mb-3 h-48 w-full object-cover"
              />

              {/* User and likes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.picture.thumbnail}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">
                      {post.user.name.first} {post.user.name.last}
                    </p>
                    <p className="text-xs text-gray-500">@{post.user.login.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Post title */}
              <p className="mt-3 text-gray-700 dark:text-gray-200 font-medium">
                {post.photo.title.charAt(0).toUpperCase() + post.photo.title.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularToday;