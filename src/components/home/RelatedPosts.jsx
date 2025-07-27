import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck, UserPlus, UserCheck, MoreHorizontal } from 'lucide-react';

const RelatedPosts = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const [userRes, photoRes] = await Promise.all([
          fetch("https://randomuser.me/api/?results=10"),
          fetch("https://jsonplaceholder.typicode.com/photos?_limit=10"),
        ]);

        const users = await userRes.json();
        const photos = await photoRes.json();
        const combined = users.results.map((user, i) => ({
          id: i + 1,
          user,
          photo: photos[i],
          likes: Math.floor(Math.random() * 1000) + 50,
          comments: Math.floor(Math.random() * 100) + 5,
          shares: Math.floor(Math.random() * 50) + 2,
          timeAgo: generateTimeAgo(),
          isLiked: false,
          isSaved: false,
          isFollowing: false
        }));

        combined.sort((a, b) => b.likes - a.likes);

        setPopular(combined);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch popular posts:", err);
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  const generateTimeAgo = () => {
    const times = ['1h', '2h', '3h', '5h', '8h', '12h', '1d', '2d', '3d', '1w'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const handleLike = (postId) => {
    setPopular(popular.map(post => 
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
    setPopular(popular.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleFollow = (postId) => {
    setPopular(popular.map(post => 
      post.id === postId 
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const handleShare = (postId) => {
    setPopular(popular.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    console.log(`Shared post ${postId}`);
  };

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading popular posts...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#222831] mb-4">Related Posts</h2>
      <div className="space-y-4">
        {popular.map((post) => (
          <div
            key={post.id}
            className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
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
                  <p className="text-xs text-gray-500">{post.timeAgo}</p>
                </div>
              </div>
              <button className="text-[#222831] hover:text-[#948979]">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Post Image */}
            <div className="px-2 pb-1">
              <img
                src={`https://picsum.photos/300/200?random=${post.id + 100}`}
                alt={post.photo.title}
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="px-3 pb-2">
              <p className="text-[#222831] text-sm line-clamp-2">
                {post.photo.title}
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
      
      {/* View More Button */}
      <div className="text-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
          View More Posts
        </button>
      </div>
    </div>
  );
};

export default RelatedPosts;