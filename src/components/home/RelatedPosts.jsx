import { useEffect, useState } from "react";

const PopularPosts = () => {
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

        // Combine data with mock like count
        const combined = users.results.map((user, i) => ({
          user,
          photo: photos[i],
          likes: Math.floor(Math.random() * 1000), // mock likes
        }));

        // Sort by likes (descending)
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

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading popular posts...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Popular Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {popular.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition hover:shadow-lg"
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
                <p className="text-gray-800 dark:text-white font-medium">
                  {post.user.name.first}
                </p>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                ❤️ {post.likes}
              </span>
            </div>

            {/* Post title */}
            <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">
              {post.photo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
