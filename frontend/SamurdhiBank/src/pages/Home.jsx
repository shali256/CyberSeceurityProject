import React from 'react';
import { useAuthStore } from '../store/authStore.js'; // Adjust the import path accordingly
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

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
    <div>
      <Navbar/>
      <h1>Hello Home</h1>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
      <Footer/>
    </div>
  );
};

export default Home;