import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, UserPlus, UserCheck, MoreHorizontal } from 'lucide-react';

const CustomFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const userRes = await fetch("https://randomuser.me/api/?results=50");
        const photoRes = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=50");
        const userData = await userRes.json();
        const photoData = await photoRes.json();

        const combined = userData.results.map((user, index) => ({
          id: index + 1,
          user,
          photo: photoData[index],
          likes: Math.floor(Math.random() * 500) + 10,
          comments: Math.floor(Math.random() * 50) + 1,
          shares: Math.floor(Math.random() * 20) + 1,
          timeAgo: generateTimeAgo(),
          isLiked: false,
          isSaved: false,
          isFollowing: false
        }));

        setPosts(combined);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const generateTimeAgo = () => {
    const times = ['2m', '5m', '15m', '30m', '1h', '2h', '3h', '5h', '8h', '12h', '1d', '2d', '3d'];
    return times[Math.floor(Math.random() * times.length)];
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
    // You can add actual share functionality here
    console.log(`Shared post ${postId}`);
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading feed...</p>;

  return (
    <div className="space-y-6 mt-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center space-x-3">
              <img
                src={post.user.picture.thumbnail}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">
                    {post.user.name.first} {post.user.name.last}
                  </h3>
                  <button
                    onClick={() => handleFollow(post.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      post.isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-[#393E46] text-white hover:bg-[#948979]'
                    }`}
                  >
                    {post.isFollowing ? (
                      <>
                        <UserCheck className="w-3 h-3" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{post.user.location.country}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
            <button className="text-[#222831] hover:text-[#948979]">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-2">
            <p className="text-gray-800 leading-relaxed">
              {post.photo.title}
            </p>
          </div>

          {/* Post Image */}
          <div className="px-2 pb-2">
            <img
              src={`https://picsum.photos/500/400?random=${post.id}`}
              alt={post.photo.title}
              className="w-full rounded-lg object-cover max-h-128"
            />
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-600">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  post.isLiked 
                    ? 'text-red-500 scale-105' 
                    : 'text-[#222831] hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-[#222831] hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              
              <button 
                onClick={() => handleShare(post.id)}
                className="flex items-center space-x-2 text-[#222831] hover:text-green-500 transition-colors"
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
                  : 'text-[#222831] hover:text-blue-600'
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

export default CustomFeed;