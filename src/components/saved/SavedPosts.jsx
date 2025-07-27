import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, BookmarkX, MoreHorizontal } from 'lucide-react';

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just finished reading an amazing book on design principles. The way good design can transform user experience is truly fascinating! 📚✨",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      likes: 124,
      comments: 18,
      shares: 7,
      timeAgo: "2h",
      savedAt: "Saved 3 days ago"
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        username: "@mchen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Coffee shop coding session complete! Sometimes a change of environment is all you need to breakthrough that creative block. ☕️💻",
      likes: 89,
      comments: 12,
      shares: 3,
      timeAgo: "5h",
      savedAt: "Saved 1 week ago"
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        username: "@emmad",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "Sunset photography from last weekend's hiking trip. Nature never fails to inspire and remind us of the beauty in simplicity. 🌅🏔️",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      likes: 203,
      comments: 31,
      shares: 15,
      timeAgo: "1d",
      savedAt: "Saved 2 weeks ago"
    },
    {
      id: 4,
      user: {
        name: "Alex Thompson",
        username: "@alexthompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just launched my first indie app! It's been months of late nights and countless iterations, but seeing users enjoy it makes it all worth it. 🚀",
      likes: 156,
      comments: 24,
      shares: 11,
      timeAgo: "3d",
      savedAt: "Saved 1 month ago"
    }
  ]);

  const handleUnsave = (postId) => {
    setSavedPosts(savedPosts.filter(post => post.id !== postId));
  };

  const handleLike = (postId) => {
    setSavedPosts(savedPosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  if (savedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Bookmark className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved posts yet</h3>
        <p className="text-gray-500">Start exploring and save posts you'd like to read later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {savedPosts.map((post) => (
        <div key={post.id} className="bg-[#393E46] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
          {/* Post Header */}
          <div className="flex items-center justify-between p-3 pb-2">
            <div className="flex items-center space-x-2">
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{post.user.name}</h3>
                <div className="flex items-center space-x-1 text-xs text-white">
                  <span className="truncate">{post.user.username}</span>
                </div>
              </div>
            </div>
            <button className="text-white hover:text-gray-300 flex-shrink-0">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Saved timestamp */}
          <div className="px-3 pb-2">
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {post.savedAt}
            </span>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-2 pb-2">
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full rounded-lg object-cover h-32"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="px-3 pb-2 flex-1">
            <p className="text-white text-sm leading-relaxed line-clamp-3">{post.content}</p>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 mt-auto">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'text-white hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-1 text-white hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-1 text-white hover:text-green-500 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">{post.shares}</span>
              </button>
            </div>

            <button 
              onClick={() => handleUnsave(post.id)}
              className="text-blue-600 hover:text-red-500 transition-colors group"
              title="Remove from saved"
            >
              <BookmarkX className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
      
      {/* Load More Button */}
      <div className="col-span-full text-center py-6">
        <button className="bg-[#393E46] hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
          Load More Saved Posts
        </button>
      </div>
    </div>
  );
};

export default SavedPosts;