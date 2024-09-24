import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const QuizView = () => {
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await axios.get('http://localhost:5000/api/quiz/subjects');
            setSubjects(response.data);
        };
        fetchSubjects();
    }, []);

    const handleSubjectClick = (subject) => {
        navigate(`/quiz/${subject}`);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between ">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Choose Your Quiz Subject
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            onClick={() => handleSubjectClick(subject)}
                            className="p-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1"
                        >
                            <div className="text-center text-lg">
                                {subject}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default QuizView;
