import { useState } from 'react';
import { Camera, MapPin, Calendar, ExternalLink, Edit3, Settings, UserPlus, UserCheck } from 'lucide-react';

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile] = useState(true); // This would be determined by comparing current user with profile user

  const user = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    bio: "UI/UX Designer passionate about creating beautiful and functional digital experiences. Love coffee, design, and good music. 🎨☕🎵",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-15795929518-9e396f3cc809?w=800&h=300&fit=crop",
    location: "San Francisco, CA",
    joinDate: "March 2021",
    website: "alexjohnson.design",
    followers: 2847,
    following: 892,
    posts: 156
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className=" rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-[#DFD0B8] to-[#222831]">
        
        {isOwnProfile && (
          <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {isOwnProfile && (
            <button className="absolute bottom-2 right-2 bg-[#222831] text-white p-2 rounded-full hover:bg-[#948979] transition-all">
              <Camera className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4">
          {isOwnProfile ? (
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleFollow}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isFollowing ? (
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
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Message</span>
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
          <p className="text-gray-500 mb-3">{user.username}</p>
          <p className="text-gray-700 leading-relaxed mb-4">{user.bio}</p>
          
          {/* User Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ExternalLink className="w-4 h-4" />
              <a href={`https://connexus-pied.vercel.app/`} className="text-blue-500 hover:underline">
                {user.website}
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 text-sm">
          <div className="text-center">
            <span className="block font-bold text-lg text-gray-900">{user.posts}</span>
            <span className="text-gray-500">Posts</span>
          </div>
          <div className="text-center cursor-pointer hover:underline">
            <span className="block font-bold text-lg text-gray-900">{user.followers}</span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="text-center cursor-pointer hover:underline">
            <span className="block font-bold text-lg text-gray-900">{user.following}</span>
            <span className="text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;