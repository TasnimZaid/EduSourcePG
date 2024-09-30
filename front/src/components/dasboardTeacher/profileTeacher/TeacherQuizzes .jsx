import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Shared styles for consistency
const sectionHeadingStyle = "text-2xl font-semibold text-gray-800 mb-4";
const tableStyle = "min-w-full bg-white border-collapse";
const thStyle = "border-b px-4 py-2 text-left text-sm font-medium text-gray-600";
const tdStyle = "border-b px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100";

const TeacherQuizzes = ({ teacherId }) => {
  const [data, setData] = useState({ classes: [], quizzes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the quizzes for the teacher
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/1/getQuizzesForTeacher`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  // Function to handle clicking on a quiz row
  const handleQuizClick = (quiz_id) => {
    console.log("Quiz ID:", quiz_id); // Log the quiz_id to the console
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quizzes for Teacher</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className={sectionHeadingStyle}>Classes</h2>
        {data.classes.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {data.classes.map((classItem) => (
              <li key={classItem.class_id} className="text-gray-700">
                {classItem.class_name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No classes found for this teacher.</p>
        )}
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className={sectionHeadingStyle}>Quizzes</h2>
        {data.quizzes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th className={thStyle}>Class Name</th>
                  <th className={thStyle}>Quiz Name</th>
                  <th className={thStyle}>Student Name</th>
                </tr>
              </thead>
              <tbody>
                {data.quizzes.map((quiz, index) => (
                  <tr key={index} onClick={() => handleQuizClick(quiz.quiz_id)} className="cursor-pointer">
                    <td className={tdStyle}>{quiz.class_name}</td>
                    <td className={tdStyle}>{quiz.quiz_name}</td>
                    <td className={tdStyle}>{quiz.student_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No quizzes found for this teacher.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherQuizzes;
