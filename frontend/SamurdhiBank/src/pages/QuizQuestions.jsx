import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Adjust the path to your store
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const QuizQuestions = () => {
    const { subject } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const { user } = useAuthStore(); // Access user details from your auth store

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/questions/${subject}`);
                setQuestions(response.data);
                setUserAnswers(new Array(response.data.length).fill(null));
                toast.success("Questions loaded successfully");
            } catch (error) {
                console.error("Error fetching questions:", error);
                toast.error("Error fetching questions");
            }
        };
        fetchQuestions();
    }, [subject]);

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = value;
        setUserAnswers(updatedAnswers);
    };

    const handleClearAnswer = (index) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = null;
        setUserAnswers(updatedAnswers);
        toast.info(`Answer for question ${index + 1} cleared`);
    };

    const handleSubmit = async () => {
        const totalMarks = questions.length;
        let score = 0;

        questions.forEach((question, index) => {
            if (userAnswers[index] == question.correctAnswer) {
                score++;
            }
        });

        try {
            const resultData = {
                username: user.name, // Use user.name instead of username
                subject,
                score,
                totalMarks
            };

            await axios.post("http://localhost:5000/api/quiz/save-result", resultData);
            toast.success("Quiz submitted successfully!");

            // Navigate to the result page
            navigate(`/result/${user.name}/${subject}`); // Use user.name to pass the correct username
        } catch (error) {
            console.error("Error saving result:", error);
            toast.error("Failed to submit the result");
        }
    };

    return (
        <div>
            <Navbar/>
    
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Your Quiz Base on: {subject}
                </h2>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <p className="text-lg font-medium text-gray-700">
                        You are answering <span className="font-bold">{questions.length}</span> questions.
                    </p>
                    <p className="text-sm text-gray-500">Select your answer for each question below.</p>
                </div>

                {/* Questions Section */}
                {questions.map((question, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {index + 1}. {question.question}
                        </h3>

                        {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={optIndex}
                                    checked={userAnswers[index] == optIndex}
                                    onChange={() => handleAnswerChange(index, optIndex)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    className="ml-3 text-gray-700 text-base font-medium cursor-pointer"
                                    onClick={() => handleAnswerChange(index, optIndex)}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}

                        {/* Clear Answer Button */}
                        <button
                            onClick={() => handleClearAnswer(index)}
                            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-4 rounded"
                        >
                            Clear Answer
                        </button>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
                <Footer/>
        </div>
    );
};

export default QuizQuestions;
