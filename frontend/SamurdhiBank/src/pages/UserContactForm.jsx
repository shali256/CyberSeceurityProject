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

  // Fetch user's contacts when component loads
  useEffect(() => {
    const fetchUserContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contact/contact/${user.name}`);
        setUserContacts(response.data);  // Set the fetched contacts to state
      } catch (error) {
        console.error('Error fetching user contacts:', error);
      }
    };

    if (user?.name) {
      fetchUserContacts();
    }
  }, [user?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact/contact', {
        username: user.name, email, message
      });
      setSubmitted(response.data.contact);
      setUserContacts((prevContacts) => [...prevContacts, response.data.contact]); // Add new contact to state
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div>
      <Navbar/>
   
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={user.name}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow hover:bg-indigo-700">
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold">Submitted Complaint</h3>
          <p><strong>Username:</strong> {submitted.username}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
          <p><strong>Message:</strong> {submitted.message}</p>
        </div>
      )}

      {/* Display fetched user contacts */}
      {userContacts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Previous Contacts</h3>
          {userContacts.map((contact, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-200 rounded-md bg-gray-50">
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Response:</strong> {contact.response || 'No response yet'}</p>
              <p className="text-sm text-gray-500"><strong>Submitted on:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default UserContactForm;
