import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const UserContactForm = () => {
  const { user } = useAuthStore();  // Authenticated user
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const [userContacts, setUserContacts] = useState([]);  // To store fetched contacts for the user
  const [isLoading, setIsLoading] = useState(false);  // For loading state

  // Fetch user's contacts when component loads
  useEffect(() => {
    const fetchUserContacts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/contact/contact/${user.name}`);
        setUserContacts(response.data);  // Set the fetched contacts to state
      } catch (error) {
        console.error('Error fetching user contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.name) {
      fetchUserContacts();
    }
  }, [user?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/contact/contact', {
        username: user.name, email, message
      });
      setSubmitted(response.data.contact);
      setUserContacts((prevContacts) => [...prevContacts, response.data.contact]); // Add new contact to state
      setEmail('');  // Clear the form fields after submission
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={user.name}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {submitted && (
            <div className="mt-8 p-4 border border-green-300 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Your complaint has been submitted successfully!</h3>
              <p><strong>Username:</strong> {submitted.username}</p>
              <p><strong>Email:</strong> {submitted.email}</p>
              <p><strong>Message:</strong> {submitted.message}</p>
            </div>
          )}
        </div>

        {/* Display fetched user contacts */}
        {userContacts.length > 0 && (
          <div className="max-w-2xl mx-auto mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Previous Contacts</h3>
            <div className="space-y-4">
              {userContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
                  <p className="text-base font-semibold text-gray-700"><strong>Message:</strong> {contact.message}</p>
                  <p className="text-base text-gray-700"><strong>Response:</strong> {contact.response || 'No response yet'}</p>
                  <p className="text-sm text-gray-500"><strong>Submitted on:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading && <div className="mt-6 text-center text-gray-500">Loading contacts...</div>}
      </div>

      <Footer />
    </div>
  );
};

export default UserContactForm;
