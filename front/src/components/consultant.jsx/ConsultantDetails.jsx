import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Book, MessageSquare, HelpCircle, Award, Calendar, Briefcase, FileText, Users, Globe, Send, FileInput, AlignLeft, Type } from 'lucide-react';
import AppointmentforTeacher from './AppointmentforTeacher';
import axios from 'axios';
import NavBar from '../NavBar';

export default function ConsultantDetails() {
  const [isArabic, setIsArabic] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();
  const [requestDescription, setRequestDescription] = useState('');
  const [requestType, setRequestType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');


  const storedUser = sessionStorage.getItem('teacherId');
  const userObject = JSON.parse(storedUser);
  const teacherId = storedUser;


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

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('');
    try {
      const response = await axios.post('http://localhost:3000/api/consultation-requests', {
        teacher_id: teacherId,
        consultant_id: teacher.id,
        request_type: requestType,
        description: requestDescription,
        file_url: fileUrl
      });
      console.log('Request submitted successfully:', response.data);
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
    consultantName: isArabic ? "اسم المستشار" : "Consultant Name",
    overview: isArabic ? "نظرة عامة" : "Overview",
    tests: isArabic ? "الاختبارات" : "Tests",
    works: isArabic ? "الأعمال" : "Works",
    consultations: isArabic ? "الاستشارات" : "Consultations",
    questions: isArabic ? "الأسئلة" : "Questions",
    consultantInfo: isArabic ? "معلومات المستشار" : "Consultant Information",
    specialty: isArabic ? "التخصص" : "Specialty",
    yearsOfExperience: isArabic ? "سنوات الخبرة" : "Years of Experience",
    qualifications: isArabic ? "المؤهلات" : "Qualifications",
    rating: isArabic ? "التقييم" : "Rating",
    recentConsultations: isArabic ? "الاستشارات الأخيرة" : "Recent Consultations",
    marketingStrategy: isArabic ? "استراتيجية التسويق" : "Marketing Strategy",
    financialAnalysis: isArabic ? "تحليل الأداء المالي" : "Financial Performance Analysis",
    requestConsultation: isArabic ? "طلب استشارة" : "Request Consultation",
    writePlaceholder: isArabic ? "اكتب طلب الاستشارة هنا..." : "Write your consultation request here...",
    sendRequest: isArabic ? "إرسال الطلب" : "Send Request",
    comments: isArabic ? "التعليقات" : "Comments",
    valuableTips: isArabic ? "نصائح قيمة جداً في مجال إدارة المشاريع!" : "Very valuable tips in project management!",
    moreInfo: isArabic ? "هل يمكن الحصول على مزيد من المعلومات حول تحليل السوق؟" : "Can I get more information about market analysis?",
    addComment: isArabic ? "أضف تعليقاً" : "Add a comment",
    post: isArabic ? "نشر" : "Post",
    requestType: isArabic ? "نوع الطلب" : "Request Type",
    fileUrl: isArabic ? "رابط الملف" : "File URL",
    exam: isArabic ? "امتحان" : "Exam",
    lessonPlan: isArabic ? "خطة درس" : "Lesson Plan",
    other: isArabic ? "أخرى" : "Other",
    successMessage: isArabic ? "تم إرسال الطلب بنجاح" : "Request submitted successfully",
    errorMessage: isArabic ? "حدث خطأ أثناء إرسال الطلب" : "Error submitting request",
  };

  return (
    <div className='bg-gray-100 pt-20'>
      <NavBar/>
      <div className={`font-sans p-4 ${isArabic ? 'rtl' : 'ltr'} max-w-7xl mx-auto`}>
        <header className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div className={`flex items-center flex-row-reverse space-x-4 space-x-reverse`}>
            <h1 className="text-3xl font-bold text-teal-700">{teacher?.name || text.consultantName}</h1>
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              <User size={32} />
            </div>
          </div>
          <div className={`flex ${isArabic ? 'flex-row-reverse' : 'flex-row'} space-x-3 space-x-reverse`}>
            <button onClick={toggleLanguage} className="p-3 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors duration-300 shadow-md">
              <Globe size={24} />
            </button>
            <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300 shadow-md"><MessageSquare size={24} /></button>
            <button className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-300 shadow-md"><Calendar size={24} /></button>
          </div>
        </header>


        {/* <nav className="bg-white rounded-lg shadow-md mb-6 p-4">
          <ul className={`flex ${isArabic ? 'flex-row-reverse' : 'flex-row'} justify-around`}>
            {[
              { icon: User, text: text.overview, color: 'text-teal-500' },
              { icon: FileText, text: text.tests, color: 'text-green-500' },
              { icon: Briefcase, text: text.works, color: 'text-blue-500' },
              { icon: Users, text: text.consultations, color: 'text-orange-500' },
              { icon: HelpCircle, text: text.questions, color: 'text-red-500' },
            ].map((item, index) => (
              <li key={index} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-300">
                <a className={`flex flex-col items-center space-y-1 ${isArabic ? 'flex-col-reverse' : 'flex-col'}`}>
                  <item.icon className={`${item.color}`} size={24} />
                  <span className="text-sm font-medium">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav> */}

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-teal-700 border-b pb-2">{text.consultantInfo}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: text.specialty, value: teacher?.specialization || '' },
                { label: text.yearsOfExperience, value: teacher?.years_of_experience || '' },
                { label: text.qualifications, value: teacher?.certificate_img ? "Certificate Available" : "No Certificate" },
                { label: text.rating, value: 
                  <div className={`flex ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Award key={star} className="text-yellow-400" size={24} />
                    ))}
                  </div>
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className={`font-semibold text-teal-600 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>{item.label}:</p>
                  <p className={`text-gray-700 ${isArabic ? 'text-right' : 'text-left'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

         

          <aside className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-teal-700 border-b pb-2">{text.recentConsultations}</h2>
            <ul className="space-y-4">
              {[
                { icon: Briefcase, text: text.marketingStrategy, color: 'text-blue-500' },
                { icon: Briefcase, text: text.financialAnalysis, color: 'text-green-500' },
              ].map((item, index) => (
                <li key={index} className={`flex items-center ${isArabic ? 'flex-row-reverse' : 'flex-row'} space-x-3 space-x-reverse bg-gray-50 p-3 rounded-lg`}>
                  <item.icon className={`${item.color}`} size={24} />
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </main>

        <section className="bg-white rounded-lg shadow-md p-6 mt-6 ">

        <AppointmentforTeacher consultantId={id} />

         </section>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
  

  <section className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">

  <h2 className="text-2xl font-bold mb-6 text-teal-700 border-b pb-2">{text.comments}</h2>
  <form className="flex flex-col space-y-4">
    <input type="text" className="p-3 border rounded-md" placeholder={text.addComment} />
    <button className="bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition-colors duration-300">
      {text.post}
    </button>
  </form>
  <p className="mt-4 text-gray-700">{text.valuableTips}</p>
  <p className="mt-2 text-gray-700">{text.moreInfo}</p>
</section>

  <section className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full md:w-1/2" dir="rtl">
    <h2 className="text-2xl font-bold mb-6 text-teal-700 border-b pb-2 flex items-center">
      <MessageSquare className="mr-2" size={24} />
      {text.requestConsultation}
    </h2>
    {submissionStatus === 'success' && (
      <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
        <HelpCircle className="mr-2" size={20} />
        {text.successMessage}
      </div>
    )}
    {submissionStatus === 'error' && (
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center">
        <HelpCircle className="mr-2" size={20} />
        {text.errorMessage}
      </div>
    )}
    <form onSubmit={handleRequestSubmit} className="space-y-4">
      <div className="relative">
        <Type className="absolute top-3 left-3 text-gray-400" size={20} />
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="w-full p-2 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">{text.selectRequestType}</option>
          <option value="exam">{text.exam}</option>
          <option value="lesson_plan">{text.lessonPlan}</option>
          <option value="other">{text.other}</option>
        </select>
      </div>
      <div className="relative">
        <AlignLeft className="absolute top-3 left-3 text-gray-400" size={20} />
        <textarea
          className="w-full h-32 p-2 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder={text.writePlaceholder}
          value={requestDescription}
          onChange={(e) => setRequestDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="relative">
        <FileInput className="absolute top-3 left-3 text-gray-400" size={20} />
        <input
          type="url"
          className="w-full p-2 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder={text.fileUrlOptional}
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center"
      >
        <Send className="mr-2" size={20} />
        {text.sendRequest}
      </button>
    </form>
  </section>

  
</div>

      </div>
    </div>
  );
}