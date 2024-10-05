import React from "react";
import WelcomePopup from './WelcomePopup ';
import HeroHome from "./HeroHome";
import NavBar from "../NavBar";
import IntroSection from "./IntroSection";
import w from "./assets/111.png"
import { Book, Calendar, CheckSquare, Award, Video, Users, ChartBar, MessageCircle, Briefcase, Settings } from 'lucide-react';


const FeatureCard = ({ icon, title, description, userType }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md border-l-4 ${userType === 'student' ? 'border-blue-500' : 'border-green-500'}`}>
    <div className={`flex items-center space-x-4 mb-4`}>
      <div className={`p-2 rounded-full ${userType === 'student' ? 'bg-blue-100' : 'bg-green-100'}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

function HomePage() {

  const features = {
    student: [
      { icon: <Book className="w-6 h-6 text-blue-500" />, title: "Course Access", description: "Easy access to all your courses and learning materials in one place." },
      { icon: <Award className="w-6 h-6 text-blue-500" />, title: "Progress Monitoring", description: "Visual insights into your academic progress and achievements." },
      { icon: <Video className="w-6 h-6 text-blue-500" />, title: "Interactive Learning", description: "Engage with video lessons, quizzes, and interactive study materials." }
    ],
    teacher: [
      { icon: <Users className="w-6 h-6 text-green-500" />, title: "Class Management", description: "Efficiently manage multiple classes and student groups." },
      { icon: <ChartBar className="w-6 h-6 text-green-500" />, title: "Performance Analytics", description: "Gain insights into student performance with detailed analytics." },
      { icon: <MessageCircle className="w-6 h-6 text-green-500" />, title: "Communication Tools", description: "Easy-to-use tools for communicating with students and parents." },
    ]
  };
  // Define a common background color
  const bgColor = "#E6F3FF"; // Light blue color, you can adjust this

  return (
    <div className="" >
      <NavBar />

      <WelcomePopup />
      <HeroHome />

      <img src={w} alt="" className="w-[30%] " />

      <img src="https://i.pinimg.com/originals/cc/b0/1c/ccb01c058068c3e2a09c9fb751299297.gif" alt="" />

      <IntroSection  />
   

      <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">FUTURE-READY SKILLS</h2>
        <p className="text-xl text-center text-blue-600 mb-8">PREPARING FOR TOMORROW</p>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Equip learners with the skills they need to thrive in a rapidly evolving world. From coding to
          critical thinking, we've got you covered.
        </p>

        <div className="flex justify-center space-x-4 mb-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            FOR STUDENTS
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            FOR TEACHERS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.student.map((feature, index) => (
            <FeatureCard key={`student-${index}`} {...feature} userType="student" />
          ))}
          {features.teacher.map((feature, index) => (
            <FeatureCard key={`teacher-${index}`} {...feature} userType="teacher" />
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:shadow-lg">
            Explore the Platform
          </a>
        </div>
      </div>
    </section>


    </div>
  );
}

export default HomePage;





 

