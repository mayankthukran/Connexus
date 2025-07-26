import { useEffect, useState } from "react";

const TopCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=5"); // Top 8 users
        const data = await res.json();
        const topUsers = data.results.map(user => ({
          ...user,
          followers: Math.floor(Math.random() * 10000), // mock followers count
        }));

        // Sort by followers
        topUsers.sort((a, b) => b.followers - a.followers);

        setCreators(topUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top creators:", err);
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading top creators...</p>;

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-3 text-[#222831]">Top Creators</h2>
      <ul className="space-y-2">
        {creators.map((user, index) => (
          <li key={index} className="flex items-center justify-between dark:bg-[#393E46] p-2 rounded-xl shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={user.picture.thumbnail}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 dark:text-white font-medium">
                  {user.name.first} {user.name.last}
                </p>
                <p className="text-sm text-gray-500">{user.location.country}</p>
              </div>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
              {user.followers.toLocaleString()} followers
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCreators;
