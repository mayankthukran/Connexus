import { useState } from 'react';
import { Image, Video, Smile, MapPin, Hash, X } from 'lucide-react';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const user = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (postContent.trim() || selectedImages.length > 0) {
      console.log('Posting:', { content: postContent, images: selectedImages });
      // Here you would typically send the post to your backend
      setPostContent('');
      setSelectedImages([]);
      setIsExpanded(false);
    }
  };

  const characterLimit = 280;
  const remainingChars = characterLimit - postContent.length;

  return (
    <div className=" rounded-lg shadow-md p-4">
      <div className="flex space-x-3">
        {/* User Avatar */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />

        {/* Post Input Area */}
        <div className="flex-1">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's happening?"
            className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
            rows={isExpanded ? 4 : 2}
            maxLength={characterLimit}
          />

          {/* Image Preview */}
          {selectedImages.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Expanded Options */}
          {isExpanded && (
            <>
              {/* Character Count */}
              <div className="flex justify-end mt-2">
                <span className={`text-sm ${
                  remainingChars < 20 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {remainingChars}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  {/* Image Upload */}
                  <label className="cursor-pointer text-blue-500 hover:text-blue-600 transition-colors">
                    <Image className="w-5 h-5" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Video Upload */}
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>

                  {/* Emoji */}
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Location */}
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </button>

                  {/* Hashtag */}
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <Hash className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Button */}
                <button
                  onClick={handlePost}
                  disabled={!postContent.trim() && selectedImages.length === 0}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    postContent.trim() || selectedImages.length > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;