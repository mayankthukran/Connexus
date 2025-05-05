// src/pages/HomePage.jsx
import Navbar from '../components/home/Navbar';
import CustomFeed from '../components/home/CustomFeed';
import TopCreators from '../components/home/TopCreators';
import RelatedPosts from '../components/home/RelatedPosts';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <CustomFeed />
          </div>
          <div className="lg:col-span-4">
            <div className="mb-6">
              <TopCreators />
            </div>
            <div>
              <RelatedPosts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;