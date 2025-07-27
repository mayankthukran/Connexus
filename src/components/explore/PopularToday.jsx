import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, UserPlus, UserCheck, MoreHorizontal } from 'lucide-react';

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

  const generateTimeAgo = () => {
    const times = ['30m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1d', '2d'];
    return times[Math.floor(Math.random() * times.length)];
  };
  
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
        id: `post-${i + 1}`,
        user,
        photo: photos[i],
        likes: Math.floor(Math.random() * 2000) + 100,
        comments: Math.floor(Math.random() * 200) + 10,
        shares: Math.floor(Math.random() * 50) + 5,
        timeAgo: generateTimeAgo(),
        category: i % 3 === 0 ? 'trending' : (i % 3 === 1 ? 'newest' : 'following'),
        isLiked: false,
        isSaved: false,
        isFollowing: false
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

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1, 
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleFollow = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    console.log(`Shared post ${postId}`);
  };
  
  const getActiveTabContent = () => {
    const activeTab = popularTabs.find(tab => tab.active);
    return posts.filter(post => post.category === activeTab.id);
  };
  
  if (loading) {
    return (
      <div className="p-3 pt-0 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-[#222831] mb-4">Popular Today</h2>
        <div className="flex border-b border-gray-200 dark:border-gray-600 mb-4">
          {popularTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                tab.active
                  ? 'text-[#222831] border-b-2 border-[#222831]'
                : 'text-[#948979] hover:text-[#393E46]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-center py-6 text-gray-500 dark:text-gray-400">Loading popular posts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-3 pt-0 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-[#222831] mb-4">Popular Today</h2>
        <div className="flex border-b border-gray-200 dark:border-gray-600 mb-4">
          {popularTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                tab.active
                  ? 'text-[#222831] border-b-2 border-[#222831]'
                : 'text-[#948979] hover:text-[#393E46]'
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
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const activeContent = getActiveTabContent();
  
  return (
    <div className="p-3 pt-0 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-[#222831] mb-4">Popular Today</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 mb-4">
        {popularTabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 -mb-px text-sm font-medium transition-colors ${
              tab.active
                ? 'text-[#222831] border-b-2 border-[#222831]'
                : 'text-[#948979] hover:text-[#393E46]'
            }`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      {activeContent.length === 0 ? (
        <p className="text-center py-6 text-gray-500 dark:text-gray-400">No content to display</p>
      ) : (
        <div className="space-y-4">
          {activeContent.map((post, index) => (
            <div
              key={post.id}
              className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-3 pb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.user.picture.thumbnail}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-medium text-sm">
                        {post.user.name.first} {post.user.name.last}
                      </p>
                      <button
                        onClick={() => handleFollow(post.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          post.isFollowing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-[#222831] text-white hover:bg-[#948979]'
                        }`}
                      >
                        {post.isFollowing ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserPlus className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>@{post.user.login.username}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <button className="text-[#222831] hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Post Image */}
              <div className="px-2 pb-2">
                <img
                  src={`https://picsum.photos/300/200?random=${index + 200}`}
                  alt={post.photo.title}
                  className="rounded-lg w-full h-32 object-cover"
                />
              </div>

              {/* Post Content */}
              <div className="px-3 pb-2">
                <p className="text-[#222831] text-sm font-medium">
                  {post.photo.title.charAt(0).toUpperCase() + post.photo.title.slice(1)}
                </p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 dark:border-gray-600">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 transition-all duration-200 ${
                      post.isLiked 
                        ? 'text-red-500 scale-105' 
                        : 'text-[#222831] hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-[#222831] hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-1 text-[#222831] hover:text-green-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-medium">{post.shares}</span>
                  </button>
                </div>

                <button 
                  onClick={() => handleSave(post.id)}
                  className={`transition-all duration-200 ${
                    post.isSaved 
                      ? 'text-blue-600 scale-110' 
                      : 'text-[#222831] hover:text-blue-600'
                  }`}
                  title={post.isSaved ? "Remove from saved" : "Save post"}
                >
                  {post.isSaved ? (
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* View All Button */}
      <div className="text-center mt-4">
        <button className="bg-[#222831] hover:bg-[#948979] text-white px-4 py-2 rounded-lg text-sm transition-color">
          View All Popular
        </button>
      </div>
    </div>
  );
};

export default PopularToday;