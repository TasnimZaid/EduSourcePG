import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Folder, User, ChevronDown, ChevronRight } from 'lucide-react';

const GetClassStudent = ({ teacherId }) => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [openClass, setOpenClass] = useState(null);

    useEffect(() => {
        const fetchClassStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/1/getClassStudentsByTeacherId`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching class students:', error);
                setError('Failed to fetch students.');
            }
        };
        fetchClassStudents();
    }, [teacherId]);

    const groupedStudents = students.reduce((acc, student) => {
        const className = student.class_name;
        if (!acc[className]) {
            acc[className] = [];
        }
        acc[className].push(student);
        return acc;
    }, {});

    const folderColors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-yellow-100 text-yellow-600',
        'bg-purple-100 text-purple-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600',
    ];

    const toggleClass = (className) => {
        setOpenClass(openClass === className ? null : className);
    };

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold mb-6">Classes for Teacher ID: {teacherId}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {Object.keys(groupedStudents).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(groupedStudents).map(([className, classStudents], index) => (
                        <div key={className} className="relative">
                            <div 
                                className={`cursor-pointer rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg ${folderColors[index % folderColors.length]}`}
                                onClick={() => toggleClass(className)}
                            >
                                <div className="flex items-center justify-between">
                                    <Folder size={48} />
                                    <span className="text-lg font-semibold">{className}</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <span>{classStudents.length} students</span>
                                    {openClass === className ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </div>
                            </div>
                            {openClass === className && (
                                <div className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-2 text-left">Student Name</th>
                                                <th className="p-2 text-left">Teacher Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classStudents.map((student) => (
                                                <tr key={student.id} className="border-t">
                                                    <td className="p-2 flex items-center">
                                                        <User className="mr-2" size={16} />
                                                        {student.student_name}
                                                    </td>
                                                    <td className="p-2">{student.teacher_name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No classes found for this teacher.</p>
            )}
        </div>
    );
};

export default GetClassStudent;