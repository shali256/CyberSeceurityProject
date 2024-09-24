import React, { useState } from 'react';
import axios from "axios";

const QuizDashboard = ({ onCancel }) => {
    const [subject, setSubject] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [error, setError] = useState(""); // State to handle error messages

    const handleAddQuestion = async () => {
          // Check if all fields are filled
          if (!subject || !question || options.some(opt => !opt) || correctAnswer === "") {
            setError("Please fill in all fields.");
            alert('All field required') // Set error message
            return; // Exit the function
        }

        // Clear error if validation passes
        setError("");
        const data = { subject, question, options, correctAnswer };
        await axios.post("http://localhost:5000/api/quiz/add-question", data);
        alert("Question added!");
        onCancel(); // Close the modal after adding the question
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <h3 className="font-semibold mb-2">Options:</h3>
                {options.map((opt, index) => (
                    <input
                        key={index}
                        type="text"
                        className="border p-2 w-full mb-2"
                        placeholder={`Option ${index + 1}`}
                        value={opt}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                ))}
                <input
                    type="number"
                    className="border p-2 w-full mb-4"
                    placeholder="Correct Answer (Index)"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <div className="flex justify-between">
                    <button
                        onClick={handleAddQuestion}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Question
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizDashboard;
