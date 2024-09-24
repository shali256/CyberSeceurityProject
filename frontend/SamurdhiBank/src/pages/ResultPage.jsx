import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const ResultPage = () => {
    const { username, subject } = useParams(); // Get username and subject from the URL parameters
    const [results, setResults] = useState(null);
    const [questions, setQuestions] = useState([]); // State to store the quiz results
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Fetch results for the specific user and subject
                const response = await axios.get(`http://localhost:5000/api/quiz/result/${username}/${subject}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
    }, [username, subject]); // Refetch results when the username or subject changes

    // Fetch the questions for the specified subject
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetch questions for the specified subject
                const response = await axios.get(`http://localhost:5000/api/quiz/questions/${subject}`);
                setQuestions(response.data);
            } catch (error) {
                console.error(`Error fetching questions for subject ${subject}:`, error);
            }
        };

        fetchQuestions();
    }, [subject]); 

    // Generate PDF of the results
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text(`Quiz Questions - Subject: ${subject}`, 20, 20);

        let yOffset = 30; // Initial vertical offset

        if (questions.length > 0) {
            // Create table content for each question
            const questionData = questions.map((q, i) => [
                i + 1,
                q.question,
                q.options.join(", "), // Display options as comma-separated
                q.options[q.correctAnswer] // Correct answer
            ]);

            doc.autoTable({
                startY: yOffset,
                head: [['No', 'Question', 'Options', 'Correct Answer']],
                body: questionData,
                theme: 'grid',
            });

            // Update yOffset after the table
            yOffset = doc.lastAutoTable.finalY + 10;
        }

        // Save the PDF
        doc.save(`quiz-questions-${subject}.pdf`);
    };
    // If results are not loaded yet, show a loading message
    if (!results) {
        return <div className="flex justify-center items-center h-screen"><div className="text-xl font-semibold">Loading...</div></div>;
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="p-6 text-center">
                    <h2 className="text-3xl font-bold text-black">Quiz Results for {username} - {subject}</h2>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map((result, index) => (
                        <div key={index} className="bg-gray-50 border rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">Subject: {result.subject}</h3>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-gray-700 text-lg">
                                    <p>Total Marks: <span className="font-medium">{result.totalMarks}</span></p>
                                    <p>Your Score: <span className="font-medium">{result.score}</span></p>
                                </div>
                                <div>
                                    {result.pass ? (
                                        <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-4 py-2 rounded-full">
                                            Passed
                                        </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-4 py-2 rounded-full">
                                            Failed
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Progress
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                            {((result.score / result.totalMarks) * 100).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                                    <div
                                        style={{ width: `${(result.score / result.totalMarks) * 100}%` }}
                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                            result.pass ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 text-center">
                    <button 
                        onClick={generatePDF} 
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mr-4"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={() => navigate('/quiz')}
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResultPage;
