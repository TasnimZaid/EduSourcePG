import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book, User, Award } from 'lucide-react';

const QuizzesOfStudent = ({ studentId }) => {
  const [quizzesBySubject, setQuizzesBySubject] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/1/getStudentQuizzes`);
        const groupedQuizzes = response.data.reduce((acc, quiz) => {
          if (!acc[quiz.subject]) {
            acc[quiz.subject] = [];
          }
          acc[quiz.subject].push(quiz);
          return acc;
        }, {});
        setQuizzesBySubject(groupedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [studentId]);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
    setSelectedQuizId(null);
  };

  const handleQuizClick = (quizId) => {
    setSelectedQuizId(quizId);
    console.log('Selected Quiz ID:', quizId);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Explore Your Quizzes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-16">
        {Object.keys(quizzesBySubject).map((subject) => (
          <div
            key={subject}
            className={`bg-gradient-to-b from-blue-400 to-blue-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedSubject === subject ? 'ring-4 ring-indigo-400' : ''}`}
            onClick={() => handleSubjectClick(subject)}
          >
            <h2 className="font-bold text-xl mb-3 text-yellow-100">{subject}</h2>
            <p className="text-gray-200 flex items-center mb-2">
              <Book className="mr-2" size={18} />
              {quizzesBySubject[subject].length} quizzes
            </p>
            <p className="text-yellow-300 text-sm">Click to explore</p>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-12">
          <h2 className="text-3xl font-extrabold mb-6 text-purple-600">Quizzes for {selectedSubject}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzesBySubject[selectedSubject].map((quiz) => (
              <div
                key={quiz.quizId}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleQuizClick(quiz.quizId)}
              >
                <img
                  src={quiz.quiz_img}
                  alt={quiz.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-indigo-600">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <Award className="mr-2" size={16} />
                    Grade: {quiz.grade}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <User className="mr-2" size={16} />
                    Teacher: {quiz.teacherName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedQuizId && (
        <p className="mt-8 text-center text-lg font-semibold text-indigo-600">
          Selected Quiz ID: {selectedQuizId}
        </p>
      )}
    </div>
  );
};

export default QuizzesOfStudent;
