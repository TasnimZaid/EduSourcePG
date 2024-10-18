import React from "react";
import WelcomePopup from './WelcomePopup';
import HeroHome from "./HeroHome";
import NavBar from "../NavBar";
import IntroSection from "./IntroSection";
import w from "./assets/111.png";
import TeacherResourcesSlider from "./teacherSlider";
import { Book, Calendar, CheckSquare, Award, Video, Users, ChartBar, MessageCircle, Briefcase, Settings, Star, Lightbulb, BookOpen, HeartHandshake } from 'lucide-react';
import LuxuryKitchenShowcase from "./SpaceAnimation";
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

const WhyChooseUsCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg  transition duration-300 ease-in-out hover:shadow-md  ">
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-2 rounded-full bg-purple-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

function HomePage() {


  const whyChooseUsReasons = [
    { icon: <Star className="w-6 h-6 text-purple-500" />, title: "Expert Guidance", description: "Access to experienced educators and mentors for personalized advice." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, title: "Innovative Resources", description: "Curated collection of modern teaching methods and materials." },
    { icon: <BookOpen className="w-6 h-6 text-purple-500" />, title: "Continuous Learning", description: "Regular updates with the latest educational trends and practices." },
    { icon: <HeartHandshake className="w-6 h-6 text-purple-500" />, title: "Supportive Community", description: "Connect with peers and experienced educators for mutual growth." },
  ];

  // Define a common background color
  const bgColor = "#E6F3FF"; // Light blue color, you can adjust this

  return (
    <div className="">
      <NavBar />
      <WelcomePopup />
      <HeroHome />
      <TeacherResourcesSlider/>
      <LuxuryKitchenShowcase/>
      
      {/* Why Choose Us Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsReasons.map((reason, index) => (
              <WhyChooseUsCard key={index} {...reason} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;