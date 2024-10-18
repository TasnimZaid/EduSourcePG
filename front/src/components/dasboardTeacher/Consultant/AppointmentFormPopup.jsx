import React, { useState } from 'react';
import axios from 'axios';

const AppointmentFormPopup = ({ onClose, selectedDate }) => {
  const [formData, setFormData] = useState({
    date: selectedDate || '',
    startHour: '',
    startMinute: '',
    endHour: '',
    endMinute: '',
    startPeriod: 'AM',
    endPeriod: 'AM',
    isAvailable: true,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for stored teacher data in sessionStorage and handle potential errors
  const storedUser = sessionStorage.getItem('teacherId');
  let teacherConsultantId = null;
  if (storedUser) {
    try {
      const userObject = JSON.parse(storedUser);
      teacherConsultantId = userObject || null;
    } catch (error) {
      console.error('Error parsing stored user data', error);
    }
  }

  // Generate hours and minutes for dropdowns
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateTimeSlot = () => {
    const { startHour, startMinute, endHour, endMinute, startPeriod, endPeriod } = formData;
    const startTime = `${startHour}:${startMinute}${startPeriod}`;
    const endTime = `${endHour}:${endMinute}${endPeriod}`;
    return startTime !== endTime && startHour && startMinute && endHour && endMinute;
  };

  const formatTimeSlot = () => {
    const { startHour, startMinute, endHour, endMinute, startPeriod, endPeriod } = formData;
    return `${startHour}:${startMinute}${startPeriod}-${endHour}:${endMinute}${endPeriod}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTimeSlot()) {
      setError('Please enter a valid time slot');
      return;
    }

    if (!teacherConsultantId) {
      setError('Teacher ID not found. Please log in again.');
      return;
    }

    setError('');
    setIsLoading(true);

    const timeSlot = formatTimeSlot();

    try {
      const response = await axios.post('http://localhost:3000/api/availability', {
        consultant_id: teacherConsultantId,
        date: formData.date,
        time_slot: timeSlot,
        is_available: formData.isAvailable
      });
      onClose(response.data);
    } catch (error) {
      console.error('Error adding teacher consultant availability', error);
      setError('Failed to add availability. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Add Teaching Availability</h2>
        <form onSubmit={handleSubmit}>
          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          {/* Start Time Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Start Time:</label>
            <div className="flex space-x-2">
              <select
                name="startHour"
                value={formData.startHour}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Hour</option>
                {hours.map(hour => (
                  <option key={`start-${hour}`} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                name="startMinute"
                value={formData.startMinute}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Minute</option>
                {minutes.map(minute => (
                  <option key={`start-${minute}`} value={minute}>{minute}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <label>
                  <input
                    type="radio"
                    name="startPeriod"
                    value="AM"
                    checked={formData.startPeriod === 'AM'}
                    onChange={handleInputChange}
                  /> AM
                </label>
                <label>
                  <input
                    type="radio"
                    name="startPeriod"
                    value="PM"
                    checked={formData.startPeriod === 'PM'}
                    onChange={handleInputChange}
                  /> PM
                </label>
              </div>
            </div>
          </div>

          {/* End Time Input */}
          <div className="mb-4">
            <label className="block text-gray-700">End Time:</label>
            <div className="flex space-x-2">
              <select
                name="endHour"
                value={formData.endHour}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Hour</option>
                {hours.map(hour => (
                  <option key={`end-${hour}`} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                name="endMinute"
                value={formData.endMinute}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Minute</option>
                {minutes.map(minute => (
                  <option key={`end-${minute}`} value={minute}>{minute}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <label>
                  <input
                    type="radio"
                    name="endPeriod"
                    value="AM"
                    checked={formData.endPeriod === 'AM'}
                    onChange={handleInputChange}
                  /> AM
                </label>
                <label>
                  <input
                    type="radio"
                    name="endPeriod"
                    value="PM"
                    checked={formData.endPeriod === 'PM'}
                    onChange={handleInputChange}
                  /> PM
                </label>
              </div>
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="mb-4">
            <label className="block text-gray-700">Available:</label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Availability'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormPopup;
