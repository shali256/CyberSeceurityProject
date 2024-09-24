import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../utils/Model'; // Adjust the import path as necessary
import QuizDashboard from '../Admin/QuizDasboard'; // Adjust the import path as necessary
import Sidebar from './Sidebar';

const UserResultDashboard = () => {
  const [userResults, setUserResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz/results');
        setUserResults(response.data);
      } catch (error) {
        console.error('Error fetching user results:', error);
      }
    };

    fetchUserResults();
  }, []);

  const groupedResults = userResults.reduce((acc, result) => {
    const { username, subject } = result;
    if (!acc[username]) {
      acc[username] = {};
    }
    if (!acc[username][subject]) {
      acc[username][subject] = [];
    }
    acc[username][subject].push(result);
    return acc;
  }, {});

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar />
    {/* Main Content */}
    <div className="flex-1 p-6 bg-gray-100">
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">User Results</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 inline-block px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Question
      </button>

      {Object.entries(groupedResults).map(([username, subjects]) => (
        <div key={username} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{username}</h2>
          <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-700">Subject</th>
                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-700">Score</th>
                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-700">Total Marks</th>
                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-700">Passed</th>
                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(subjects).map(([subject, results]) => (
                <React.Fragment key={subject}>
                  <tr className="bg-white hover:bg-gray-50 transition duration-300">
                    <td className="border border-gray-300 p-4">{subject}</td>
                    <td className="border border-gray-300 p-4">{results[0].score}</td>
                    <td className="border border-gray-300 p-4">{results[0].totalMarks}</td>
                    <td className="border border-gray-300 p-4">{results[0].pass ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 p-4">{new Date(results[0].date).toLocaleDateString()}</td>
                  </tr>
                  {results.slice(1).map((result, index) => (
                    <tr key={index} className="bg-gray-100 hover:bg-gray-200 transition duration-300">
                      <td className="border border-gray-300 p-4">{subject}</td>
                      <td className="border border-gray-300 p-4">{result.score}</td>
                      <td className="border border-gray-300 p-4">{result.totalMarks}</td>
                      <td className="border border-gray-300 p-4">{result.pass ? 'Yes' : 'No'}</td>
                      <td className="border border-gray-300 p-4">{new Date(result.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuizDashboard onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default UserResultDashboard;
