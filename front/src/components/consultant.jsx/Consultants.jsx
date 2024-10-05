import React, { useState, useEffect } from 'react';
import { Star, Heart, Search, DollarSign, Globe, Clock, Filter, ChevronDown, Award, HelpCircle, FileText, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const translations = {
  ar: {
    title: "مستشارون تربويون للمعلمين",
    description: "ابحث عن مستشار تربوي لاستشارة، سؤال سريع، أو إجراء امتحان. منصتنا هي الرائدة في تقديم الخدمات التعليمية عبر الإنترنت.",
    serviceType: "نوع الخدمة",
    consultation: "استشارة تربوية",
    quickQuestion: "سؤال سريع",
    exam: "إجراء امتحان",
    price: "السعر",
    specialty: "التخصص",
    classManagement: "إدارة الصف",
    modernTeaching: "طرق التدريس الحديثة",
    eLearning: "التعليم الإلكتروني",
    assessment: "التقييم والاختبارات",
    language: "اللغة",
    availableTime: "الوقت المتاح",
    experience: "الخبرة",
    rating: "التقييم",
    sortBy: "ترتيب حسب: الأكثر ملاءمة",
    search: "البحث بالاسم أو الكلمة المفتاحية",
    availableConsultants: "مستشار تربوي متاح",
    featuredConsultant: "مستشار متميز",
    activeStudents: "طالب نشط",
    sessions: "جلسة",
    readMore: "اقرأ المزيد",
    bookConsultation: "حجز استشارة",
    askQuestion: "طرح سؤال",
    requestExam: "طلب امتحان",
    perConsultation: "للاستشارة",
    switchLanguage: "English",
  },
  en: {
    title: "Educational Consultants for Teachers",
    description: "Find an educational consultant for advice, a quick question, or an exam. Our platform is the leader in providing online educational services.",
    serviceType: "Service Type",
    consultation: "Educational Consultation",
    quickQuestion: "Quick Question",
    exam: "Conduct Exam",
    price: "Price",
    specialty: "Specialty",
    classManagement: "Classroom Management",
    modernTeaching: "Modern Teaching Methods",
    eLearning: "E-Learning",
    assessment: "Assessment and Testing",
    language: "Language",
    availableTime: "Available Time",
    experience: "Experience",
    rating: "Rating",
    sortBy: "Sort by: Most Relevant",
    search: "Search by name or keyword",
    availableConsultants: "educational consultants available",
    featuredConsultant: "Featured Consultant",
    activeStudents: "active students",
    sessions: "sessions",
    readMore: "Read more",
    bookConsultation: "Book Consultation",
    askQuestion: "Ask Question",
    requestExam: "Request Exam",
    perConsultation: "per consultation",
    switchLanguage: "العربية",
  }
};


const Consultants = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'ar';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const fetchConsultants = async () => {
    try {
      const response = await fetch('/api/AllTeacher'); // Updated API endpoint
      const data = await response.json();
      const consultantsList = data.filter(consultant => consultant.role === 'consultant');
      setConsultants(consultantsList);
      setFilteredConsultants(consultantsList);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleSearch = () => {
    const filtered = consultants.filter(consultant =>
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConsultants(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`bg-gray-100 min-h-screen pt-10 ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
      <div className={`font-sans p-4 text-${language === 'ar' ? 'right' : 'left'} max-w-6xl mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <p className="mb-6 text-gray-600">{t.description}</p>
        </motion.div>

        <motion.div className="relative mb-6">
          <input
            className="w-full p-2 pl-10 border rounded-lg shadow-sm"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </motion.div>

        <motion.p
          className="mb-4 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {filteredConsultants.length} {t.availableConsultants}
        </motion.p>

        {filteredConsultants.map(consultant => (
          <motion.div
            key={consultant.id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex items-start">
              <img src={consultant.teacher_img || "/api/placeholder/100/100"} alt="Consultant" className="w-24 h-24 rounded-full mr-4" />
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{consultant.name}</h2>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="ml-1 font-semibold">{consultant.rating || 0}</span>
                    <span className="text-gray-500">({consultant.ratingsCount || 0} ratings)</span>
                  </div>
                </div>
                <p className="mb-4 text-gray-700">{consultant.specialization || "No specialization available."}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-bold text-2xl mr-2">${consultant.consultation_fee || 0}</span>
                    <span className="text-sm text-gray-500">{t.perConsultation}</span>
                  </div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Heart className="text-gray-400 ml-4 cursor-pointer hover:text-red-500 transition duration-300" size={24} />
              </motion.div>
            </div>
          </motion.div>
        ))}

        <motion.button
          className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-md"
          onClick={toggleLanguage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Languages size={24} />
          <span className="sr-only">{t.switchLanguage}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Consultants;