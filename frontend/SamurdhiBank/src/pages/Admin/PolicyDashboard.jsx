import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const PolicyDashboard = () => {
  const [readPolicies, setReadPolicies] = useState([]);

  // Fetch read policies from the backend
  useEffect(() => {
    const fetchReadPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/policy/read-policies');
        setReadPolicies(response.data);  // Set the read policies into the state
      } catch (error) {
        console.error('Error fetching read policies', error);
      }
    };

    fetchReadPolicies();
  }, []);

  // Group policies by user
  const groupedByUser = readPolicies.reduce((acc, policy) => {
    if (!acc[policy.user]) {
      acc[policy.user] = [];
    }
    acc[policy.user].push(policy);
    return acc;
  }, {});

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Policy Read History</h2>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold">User Name</th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Policy Name</th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Read Time</th>
              </tr>
            </thead>
            <tbody>
              {/* If there are read policies, group by user */}
              {Object.keys(groupedByUser).length > 0 ? (
                Object.keys(groupedByUser).map((user, userIndex) => (
                  <React.Fragment key={userIndex}>
                    {/* User name row */}
                    <tr className="bg-gray-100">
                      <td className="px-6 py-4 text-lg font-semibold text-gray-900" colSpan="3">
                        {user}
                      </td>
                    </tr>

                    {/* Policy rows for the user */}
                    {groupedByUser[user].map((policy, policyIndex) => (
                      <tr key={policyIndex} className="hover:bg-gray-100">
                        <td className="px-6 py-4 text-gray-700"></td>
                        <td className="px-6 py-4 text-gray-700">{policy.policyName}</td>
                        <td className="px-6 py-4 text-gray-700">{new Date(policy.readAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No policies read yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PolicyDashboard;
