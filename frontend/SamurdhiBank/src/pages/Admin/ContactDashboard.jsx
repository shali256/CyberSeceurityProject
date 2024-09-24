import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Modal from 'react-modal'; // Importing react-modal for the popup

// Setting the app element for accessibility
Modal.setAppElement('#root');

const ContactDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [response, setResponse] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/getcontact');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/contact/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleResponseChange = (e) => setResponse(e.target.value);

  const handleResponseSubmit = async () => {
    if (selectedContact) {
      try {
        await axios.patch(`http://localhost:5000/api/contact/contact/${selectedContact._id}/response`, { response });
        setContacts(contacts.map(contact =>
          contact._id === selectedContact._id ? { ...contact, response } : contact
        ));
        setIsModalOpen(false);
        setSelectedContact(null);
        setResponse('');
      } catch (error) {
        console.error('Error responding to contact:', error);
      }
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setResponse(contact.response || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    setResponse('');
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
          <div className="space-y-6">
            {contacts.map(contact => (
              <div key={contact._id} className="p-5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                <p className="text-lg font-medium text-gray-700"><strong>Username:</strong> {contact.username}</p>
                <p className="text-lg text-gray-600"><strong>Email:</strong> {contact.email}</p>
                <p className="text-base text-gray-600"><strong>Message:</strong> {contact.message}</p>
                {contact.response && (
                  <p className="mt-2 text-base bg-blue-100 p-2 rounded-md text-gray-800">
                    <strong>Response:</strong> {contact.response}
                  </p>
                )}
                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    onClick={() => openModal(contact)}
                    className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Modal for Reply */}
  <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Reply Modal"
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
          overlayClassName="fixed inset-0"
          closeTimeoutMS={200}
        >
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-800 mb-7">Respond to {selectedContact?.username}</h3>
            <textarea
              value={response}
              onChange={handleResponseChange}
              rows="8"
              className="w-80 px-2 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out bg-blue-50"
              placeholder="Type your response here..."
            />
            <div className="flex justify-end mt-7 space-x-5">
              <button
                onClick={handleResponseSubmit}
                className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Send Response
              </button>
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ContactDashboard;
