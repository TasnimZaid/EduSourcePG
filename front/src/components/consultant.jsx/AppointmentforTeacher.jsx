import React, { useState, useEffect, useCallback } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppointmentforTeacher = ({consultantId}) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookingData, setBookingData] = useState({
    notes: '',
    num_beneficiaries: '',
    description: ''
  });
  const storedUser = sessionStorage.getItem('teacherId');
  const userObject = JSON.parse(storedUser);
  const teacherId = storedUser;
  console.log(teacherId)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchMonthAvailabilities = useCallback(async (date) => {
    try {
      const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
      
      const response = await axios.get(`http://localhost:3000/api/availability/${consultantId}`, {
        params: { startDate, endDate }
      });

      const availabilitiesArray = Array.isArray(response.data) ? response.data : [];
      setAvailabilities(availabilitiesArray);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      setAvailabilities([]);
    }
  }, [consultantId]);
  

  useEffect(() => {
    fetchMonthAvailabilities(currentDate);
  }, [fetchMonthAvailabilities, currentDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date (onClick):", format(date, 'yyyy-MM-dd'));
  };

  const changeMonth = (increment) => {
    const newDate = increment ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
    setCurrentDate(newDate);
    fetchMonthAvailabilities(newDate);
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getDayClass = useCallback((day) => {
    let classes = "w-8 h-8 rounded-full flex items-center justify-center";
    if (!isSameMonth(day, currentDate)) classes += " text-gray-300";
    if (isSameDay(day, selectedDate)) classes += " bg-blue-500 text-white";
    if (isToday(day)) classes += " border-2 border-blue-500";

    const dayAvailabilities = availabilities.filter(avail => 
      isSameDay(parseISO(avail.date), day)
    );

    if (dayAvailabilities.length > 0) {
      const hasAvailable = dayAvailabilities.some(avail => avail.is_available && !avail.is_booked);
      const allBooked = dayAvailabilities.every(avail => avail.is_booked);

      if (allBooked) {
        classes += " bg-red-300";
      } else if (hasAvailable) {
        classes += " bg-yellow-300";
      }
    }

    return classes;
  }, [availabilities, currentDate, selectedDate]);

  const bookAppointment = async (availability) => {
    try {
      const response = await axios.post('http://localhost:3000/api/book', {
        teacher_id: teacherId,
        consultant_id: consultantId,
        availability_id: availability.id,
        notes: bookingData.notes,
        num_beneficiaries: parseInt(bookingData.num_beneficiaries),
        description: bookingData.description
      });

      if (response.status === 201) {
        const { appointment } = response.data;
        console.log(appointment);

        const updatedAvailabilities = availabilities.map(avail =>
          avail.id === availability.id ? { ...avail, is_booked: true } : avail
        );
        setAvailabilities(updatedAvailabilities);

        // Reset booking form
        setBookingData({
          notes: '',
          num_beneficiaries: '',
          description: ''
        });

        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Success!',
          text: `Appointment booked successfully! Appointment ID: ${appointment.id}`,
          icon: 'success',
          confirmButtonColor: '#115e59',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response) {
        Swal.fire({
          title: 'Error!',
          text: `Failed to book appointment: ${error.response.data.message}`,
          icon: 'error',
          confirmButtonColor: '#115e59',
          confirmButtonText: 'OK'
        });
      } else if (error.request) {
        Swal.fire({
          title: 'Error!',
          text: 'No response received from server. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#115e59',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while booking the appointment. Please try again.',
          icon: 'error',
          confirmButtonColor: '#115e59',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const getAvailabilitiesForSelectedDate = useCallback(() => {
    return availabilities.filter(avail => 
      isSameDay(parseISO(avail.date), selectedDate)
    );
  }, [availabilities, selectedDate]);

  return (
    <div className="p-1 pb-7">
      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden mt-8">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Appointments</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Calendar</h2>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-600">{format(currentDate, 'MMMM yyyy')}</h3>
                <div className="flex space-x-2">
                  <button onClick={() => changeMonth(false)} className="p-1 rounded-full hover:bg-gray-200 transition duration-300">
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                  <button onClick={() => changeMonth(true)} className="p-1 rounded-full hover:bg-gray-200 transition duration-300">
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map(day => (
                  <button
                    key={day.toString()}
                    className={getDayClass(day)}
                    onClick={() => handleDateChange(day)}
                  >
                    {format(day, 'd')}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Appointments for {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <ul className="space-y-4">
                {getAvailabilitiesForSelectedDate().length > 0 ? (
                  getAvailabilitiesForSelectedDate().map((availability) => (
                    <li key={availability.id} className={`border p-4 rounded-lg shadow-sm ${availability.is_booked ? 'bg-red-100' : 'bg-green-100'}`}>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {format(parseISO(availability.date), 'MMMM d, yyyy')} at {availability.time_slot}
                        </h3>
                        <p className="text-sm text-gray-600">Consultant ID: {consultantId}</p>
                        
                        {!availability.is_booked && (
                          <div className="mt-4 space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Number of Beneficiaries</label>
                              <input
                                type="number"
                                name="num_beneficiaries"
                                value={bookingData.num_beneficiaries}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                min="1"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                name="description"
                                value={bookingData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows="2"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Notes</label>
                              <textarea
                                name="notes"
                                value={bookingData.notes}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows="2"
                              />
                            </div>
                            <button 
                              onClick={() => bookAppointment(availability)}
                              className="w-full bg-teal-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                              Book Appointment
                            </button>
                            
                          </div>
                        )}
                        
                        {availability.is_booked && (
                          <p className="mt-2 text-red-600 font-semibold">Booked</p>
                        )}
                      </div>
                      
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No availabilities for this date.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentforTeacher;