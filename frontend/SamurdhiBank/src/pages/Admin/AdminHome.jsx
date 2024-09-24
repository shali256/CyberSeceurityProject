import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import Sidebar from './Sidebar';

// Register components for ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const AdminHome = () => {
  const [contacts, setContacts] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [userLogins, setUserLogins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await axios.get('http://localhost:5000/api/contact/getcontact');
        const resultsResponse = await axios.get('http://localhost:5000/api/quiz/results');
        const loginsResponse = await axios.get('http://localhost:5000/api/auth/logins');
        
        setContacts(contactsResponse.data);
        setUserResults(resultsResponse.data);
        setUserLogins(loginsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const contactData = {
    labels: ['Replied', 'Not Replied'],
    datasets: [{
      data: [
        (Array.isArray(contacts) ? contacts.filter(contact => contact.response).length : 0),
        (Array.isArray(contacts) ? contacts.filter(contact => !contact.response).length : 0),
      ],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };
  
  const resultData = {
    labels: Array.isArray(userResults) ? Object.keys(userResults.reduce((acc, result) => {
      acc[result.username] = (acc[result.username] || 0) + 1;
      return acc;
    }, {})) : [],
    datasets: [{
      label: 'Results per User',
      data: Array.isArray(userResults) ? Object.values(userResults.reduce((acc, result) => {
        acc[result.username] = (acc[result.username] || 0) + 1;
        return acc;
      }, {})) : [],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };
  
  const loginData = {
    labels: Array.isArray(userLogins) ? userLogins.map(login => login.empid) : [],
    datasets: [{
      label: 'Number of Logins (Hours Since Last Login)',
      data: Array.isArray(userLogins) ? userLogins.map(login => {
        const lastLoginDate = new Date(login.lastLogin);
        return ((Date.now() - lastLoginDate.getTime()) / (1000 * 3600)).toFixed(2); // Number of hours since last login rounded to two decimals
      }) : [],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }],
  };
  

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Summary Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

           {/* Login Data Bar Chart */}
           <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">User Login Data</h2>
            <div className="relative h-64">
              <Bar data={loginData} options={{ responsive: true }} />
            </div>
          </div>
             {/* Contacts Pie Chart */}
             <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Responses</h2>
            <div className="relative h-64">
              <Pie data={contactData} options={{ responsive: true }} />
            </div>
          </div>
        

          {/* Results Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">User Results</h2>
            <div className="relative h-64">
              <Bar data={resultData} options={{ responsive: true ,
                maintainAspectRatio: false,
              }} />
            </div>
          </div>
         

         
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
