import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  User, 
  Globe, 
  MessageSquare, 
  Calendar,
  Star,
  GraduationCap,
  Clock,
  Award,
  Briefcase,
  Send,
  X,
  FileText,
  ChevronRight
} from 'lucide-react';
import AppointmentforTeacher from './AppointmentforTeacher';
import ConsultationRequestForm from './ConsultationRequestForm '
import NavBar from '../NavBar';
import axios from 'axios';

export default function ConsultantDetails() {
  const [isArabic, setIsArabic] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestType, setRequestType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/TeacherDetails/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    fetchTeacherDetails();
  }, [id]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('');
    try {
      const response = await axios.post('http://localhost:3000/api/consultation-requests', {
        consultant_id: id,
        request_type: requestType,
        description: requestDescription,
        file_url: fileUrl
      });
      setSubmissionStatus('success');
      setRequestDescription('');
      setRequestType('');
      setFileUrl('');
    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmissionStatus('error');
    }
  };

  const text = {
    overview: isArabic ? "نظرة عامة" : "Overview",
    appointments: isArabic ? "المواعيد" : "Appointments",
    consultations: isArabic ? "الاستشارات" : "Consultations",
    comments: isArabic ? "التعليقات" : "Comments",
    specialty: isArabic ? "التخصص" : "Specialty",
    experience: isArabic ? "سنوات الخبرة" : "Experience",
    qualifications: isArabic ? "المؤهلات" : "Qualifications",
    requestConsultation: isArabic ? "طلب استشارة" : "Request Consultation",
    addComment: isArabic ? "أضف تعليقاً" : "Add a comment",
    post: isArabic ? "نشر" : "Post",
    recentWork: isArabic ? "الأعمال الأخيرة" : "Recent Work",
    requestType: isArabic ? "نوع الطلب" : "Request Type",
    description: isArabic ? "الوصف" : "Description",
    fileUrl: isArabic ? "رابط الملف" : "File URL",
    submit: isArabic ? "إرسال" : "Submit",
    successMessage: isArabic ? "تم إرسال الطلب بنجاح" : "Request submitted successfully",
    errorMessage: isArabic ? "حدث خطأ أثناء إرسال الطلب" : "Error submitting request"
  };

  const tabs = [
    { id: 'overview', label: text.overview },
    { id: 'appointments', label: text.appointments },
    { id: 'consultations', label: text.consultations },
    { id: 'comments', label: text.comments }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.overview}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-teal-500 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">{text.specialty}</p>
                      <p className="font-medium">{teacher?.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-teal-500 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">{text.experience}</p>
                      <p className="font-medium">{teacher?.years_of_experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="text-teal-500 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">{text.qualifications}</p>
                      <p className="font-medium">
                        {teacher?.certificate_img ? "Certificate Available" : "No Certificate"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="text-yellow-400 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="w-4 h-4 fill-yellow-500 text-yellow-500" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.recentWork}</h2>
                <div className="space-y-4">
                  {[
                    { title: "Marketing Strategy", date: "2024-03-15" },
                    { title: "Financial Analysis", date: "2024-03-10" }
                  ].map((work, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Briefcase className="text-teal-500 w-5 h-5" />
                      <div>
                        <p className="font-medium">{work.title}</p>
                        <p className="text-sm text-gray-500">{work.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-teal-400 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        );
      case 'appointments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AppointmentforTeacher consultantId={id} />
          </div>
        );
      case 'consultations':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.consultations}</h2>
            <ConsultationRequestForm consultantId={id}/>
          </div>
        );
      case 'comments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.comments}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder={text.addComment}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-gradient-to-r from-navy-500 via-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-navy-600 hover:via-blue-600 hover:to-teal-600 transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {text.post}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-navy-400 via-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {teacher?.name || "Consultant Name"}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <GraduationCap className="w-4 h-4" />
                    {teacher?.specialization}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {teacher?.years_of_experience} years
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsArabic(!isArabic)}
                className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Globe className="w-5 h-5 text-navy-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageSquare className="w-5 h-5 text-navy-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
                <Calendar className="w-5 h-5 text-navy-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-teal-500 text-teal-600'
                    : 'text-gray-500 hover:text-teal-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}