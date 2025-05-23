import { useEffect, useState } from "react";

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
          user,
          photo: photoData[index],
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

  if (loading) return <p className="text-center mt-10 text-lg">Loading feed...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition hover:shadow-lg"
        >
          {/* User info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.user.picture.thumbnail}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {post.user.name.first} {post.user.name.last}
              </p>
              <p className="text-sm text-gray-500">{post.user.location.country}</p>
            </div>
          </div>

          {/* Post image from JSONPlaceholder */}
          <img
            src={`https://picsum.photos/200/300?random=${index+1}`}
            alt={`https://picsum.photos/200/300?random=${index+1}`}
            className="rounded-md mb-4 w-full h-96 object-cover"
          />

          {/* Post caption from photo title */}
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            {post.photo.title}
          </p>

          {/* Actions */}
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔖 Save</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomFeed;
