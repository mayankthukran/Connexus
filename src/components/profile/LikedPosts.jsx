import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, UserPlus, UserCheck, MoreHorizontal } from 'lucide-react';

const LikedPosts = () => {
  const [likedPosts, setLikedPosts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Wilson",
        username: "@sarahw",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "The key to great design is not just making it look good, but making it work seamlessly for the user. Function and beauty should go hand in hand. ✨",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
      likes: 245,
      comments: 32,
      shares: 18,
      timeAgo: "4h",
      likedAt: "Liked 2 hours ago",
      isLiked: true,
      isSaved: false,
      isFollowing: false
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        username: "@mchen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just deployed my first React Native app! The learning curve was steep, but seeing it work on both iOS and Android is incredible. 📱🚀",
      likes: 167,
      comments: 28,
      shares: 12,
      timeAgo: "8h",
      likedAt: "Liked 5 hours ago",
      isLiked: true,
      isSaved: false,
      isFollowing: true
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        username: "@emmarodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "Morning meditation by the lake. Sometimes the best inspiration comes when you step away from the screen and connect with nature. 🧘‍♀️🌊",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      likes: 198,
      comments: 15,
      shares: 9,
      timeAgo: "1d",
      likedAt: "Liked yesterday",
      isLiked: true,
      isSaved: true,
      isFollowing: false
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        username: "@davidkim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Excited to announce that our startup just raised Series A! 🎉 Grateful for the amazing team and investors who believed in our vision.",
      likes: 342,
      comments: 67,
      shares: 45,
      timeAgo: "2d",
      likedAt: "Liked 2 days ago",
      isLiked: true,
      isSaved: false,
      isFollowing: true
    },
    {
      id: 5,
      user: {
        name: "Lisa Thompson",
        username: "@lisathompson",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
      },
      content: "New blog post is live: 'Building Inclusive Design Systems'. Accessibility isn't just a feature, it's a fundamental right. Let's design for everyone! ♿✊",
      likes: 156,
      comments: 23,
      shares: 31,
      timeAgo: "3d",
      likedAt: "Liked 3 days ago",
      isLiked: true,
      isSaved: false,
      isFollowing: false
    }
  ]);

  const handleLike = (postId) => {
    setLikedPosts(likedPosts.map(post => 
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
    setLikedPosts(likedPosts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleFollow = (postId) => {
    setLikedPosts(likedPosts.map(post => 
      post.id === postId 
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const handleShare = (postId) => {
    setLikedPosts(likedPosts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    console.log(`Shared post ${postId}`);
  };

  const handleUnlike = (postId) => {
    if (window.confirm('Remove this post from your liked posts?')) {
      setLikedPosts(likedPosts.filter(post => post.id !== postId));
    }
  };

  if (likedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No liked posts yet</h3>
        <p className="text-gray-500">Start exploring and like posts that inspire you!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {likedPosts.map((post) => (
        <div key={post.id} className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center space-x-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                  <button
                    onClick={() => handleFollow(post.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      post.isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {post.isFollowing ? (
                      <>
                        <UserCheck className="w-3 h-3 inline mr-1" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3 inline mr-1" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{post.user.username}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                {post.likedAt}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-gray-800 leading-relaxed">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-4 pb-3">
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full rounded-lg object-cover max-h-80"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
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

            <div className="flex items-center space-x-2">
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
              
              <button 
                onClick={() => handleUnlike(post.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Remove from liked posts"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Load More Button */}
      <div className="text-center py-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
          Load More Liked Posts
        </button>
      </div>
    </div>
  );
};

export default LikedPosts;