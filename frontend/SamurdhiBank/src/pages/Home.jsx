import React from 'react';
import { useAuthStore } from '../store/authStore.js'; // Adjust the import path accordingly
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Slider from '../components/Slider.jsx'; // Importing a slider component


const Home = () => {
  const { logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, you can add navigation logic here, e.g., redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with a slider for latest updates/announcements */}
      <section className="hero-section">
        <Slider
          slides={[
            { img: 'src/assets/image5.jpg', text: 'Welcome to Samurdhi Bank Employee Portal' },
            { img: 'src/assets/image6.jpg', text: 'Latest Updates on Policies and Guidelines' },
            { img: 'src/assets/image3.jpg', text: 'Take Part in Our Quiz and Win Rewards!' },
          ]}
        />
      </section>

      {/* Main Content */}
      <main className="home-content flex-grow px-4 py-8 md:px-8">
       
      </main>

      {/* Logout Button
      <div className="logout-container flex justify-center py-6">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`px-6 py-3 bg-red-600 text-white font-semibold rounded-lg ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          } transition duration-300`}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
