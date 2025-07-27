import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Just finished working on a new design system for our mobile app. The consistency and user experience improvements are amazing! 🎨✨ #UIDesign #MobileApp",
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=500&h=300&fit=crop",
      likes: 89,
      comments: 12,
      shares: 7,
      timeAgo: "2h",
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      content: "Beautiful sunset from my morning hike today. Sometimes you need to step away from the screen and connect with nature. 🌅🏔️",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      likes: 156,
      comments: 24,
      shares: 11,
      timeAgo: "1d",
      isLiked: true,
      isSaved: false
    },
    {
      id: 3,
      content: "Excited to share that I'll be speaking at the Design Conference next month! Topic: 'The Future of User Experience Design'. Can't wait to connect with fellow designers! 🚀",
      likes: 203,
      comments: 31,
      shares: 18,
      timeAgo: "3d",
      isLiked: false,
      isSaved: true
    },
    {
      id: 4,
      content: "Coffee shop coding session complete! ☕ There's something magical about working in a bustling cafe that sparks creativity.",
      likes: 67,
      comments: 8,
      shares: 3,
      timeAgo: "5d",
      isLiked: false,
      isSaved: false
    }
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);

  const user = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
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

  const handleShare = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    console.log(`Shared post ${postId}`);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleEdit = (postId) => {
    if (window.confirm('Are you sure you want to edit this post?')) {
      console.log(`Edit post ${postId}`);
    }
    
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
        <p className="text-gray-500">Share your first post to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Post Header */}
          <div className="flex items-center justify-between p-2 pb-2">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{user.username}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === post.id ? null : post.id)
                }
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {openMenuId === post.id && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32 z-10">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="px-2 pb-2">
            <p className="text-gray-800 leading-relaxed">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-1 pb-2">
              <img
                src={post.image}
                alt="Post content"
                className="w-full rounded-lg object-cover max-h-80"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  post.isLiked
                    ? 'text-red-500 scale-105'
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>

              <button
                onClick={() => handleShare(post.id)}
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
            </div>

            <button
              onClick={() => handleSave(post.id)}
              className={`transition-all duration-200 ${
                post.isSaved
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              title={post.isSaved ? "Remove from saved" : "Save post"}
            >
              {post.isSaved ? (
                <BookmarkCheck className="w-5 h-5 fill-current" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      <div className="text-center py-6">
        <button className="bg-[#222831] hover:bg-[#948979] text-white px-6 py-2 rounded-lg transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default Posts;
