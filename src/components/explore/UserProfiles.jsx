import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userResponse = await fetch(`https://randomuser.me/api/?results=10&page=${page}`);
      if (!userResponse.ok) throw new Error("Failed to fetch users");
      const userData = await userResponse.json();

      const combinedData = userData.results.map((user, index) => ({
        id: `${page}-${index}`,
        username: user.login.username,
        name: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.medium,
        email: user.email,
        location: `${user.location.city}, ${user.location.country}`,
        followers: Math.floor(Math.random() * 5000),
        following: Math.floor(Math.random() * 500),
        posts: Math.floor(Math.random() * 100),
        isFollowing: false
      }));
      
      setUsers(prevUsers => [...prevUsers, ...combinedData]);
      setPage(prevPage => prevPage + 1);
      setHasMore(combinedData.length === 10);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            isFollowing: !user.isFollowing,
            followers: user.isFollowing ? user.followers - 1 : user.followers + 1
          }
        : user
    ));
  };

  const loadMore = () => {
    fetchUsers();
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={fetchUsers} 
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!users || users.length === 0) {
    if (loading) {
      return <LoadingSkeleton count={3} />;
    }
    return <p className="text-gray-500">No users to display</p>;
  }

  return (
    <div className="user-profiles">
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center p-4 rounded-lg transition duration-200 border border-gray-100">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
            
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#DFD0B8] text-lg">{user.name}</h3>
                <span className="text-xs bg-[#DFD0B8] text-blue-800 px-2 py-1 rounded-full">
                  {user.followers} followers
                </span>
              </div>
              <p className="text-sm text-white">@{user.username}</p>
              <p className="text-xs text-white mt-1">{user.location}</p>
              
              <div className="flex mt-2 text-xs text-white space-x-4">
                <span>{user.posts} posts</span>
                <span>{user.following} following</span>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-2">
              <button
                onClick={() => handleFollow(user.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  user.isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-[#948979] text-white hover:bg-blue-600'
                }`}
              >
                {user.isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      
      {loading && <LoadingSkeleton count={2} />}
    </div>
  );
};

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4 mt-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center p-4 rounded-lg border border-gray-100">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/5"></div>
          </div>
          
          <div className="flex-shrink-0 ml-2">
            <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfiles;