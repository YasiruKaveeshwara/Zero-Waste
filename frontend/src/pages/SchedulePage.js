import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import axios from "axios";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";
import ScheduleInfo from "../components/Schedule/ScheduleInfo";
import CenterSelection from "../components/Schedule/CenterSelection";
import CalendarComponent from "../components/Schedule/CalendarComponent";
import "./SchedulePage.css"; // Custom CSS for additional styling

// Main Schedule Page Component
const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduledDates, setScheduledDates] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");

  // Fetch centers from the server
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("http://localhost:3050/api/centers");
        setCenters(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };
    fetchCenters();
  }, []);

  // Fetch scheduled dates from the server
  useEffect(() => {
    const fetchScheduledDates = async () => {
      try {
        if (selectedCenter) {
          const response = await axios.get(
            `http://localhost:3050/api/schedule/getByCenter/${selectedCenter}`
          );
          const schedules = response.data;

          const formattedDates = schedules.map((schedule) => ({
            date: new Date(schedule.date).toDateString(),
            info: schedule,
          }));

          setScheduledDates(formattedDates);
        }
      } catch (error) {
        console.error("Error fetching scheduled dates:", error);
      }
    };
    fetchScheduledDates();
  }, [selectedCenter]);

  const handleDateClick = (selectedDate) => {
    const selectedSchedule = scheduledDates.find(
      (scheduledDate) => scheduledDate.date === selectedDate.toDateString()
    );
    if (selectedSchedule) {
      setScheduleInfo(selectedSchedule.info);
    } else {
      setScheduleInfo(null);
    }
  };

  const tileClassName = ({ date }) => {
    if (
      scheduledDates.some(
        (scheduledDate) => scheduledDate.date === date.toDateString()
      )
    ) {
      return "highlight bg-green-500 text-white rounded-full";
    }
    return "";
  };

  return (
    <AdminDashboardLayout>
      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-green-900">
          Manage Schedules
        </h1>
        <Link
          to="/create-schedule"
          className="bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
        >
          + Create Schedule
        </Link>
      </div>

      {/* Select Center */}
      <CenterSelection
        centers={centers}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-10 bg-white rounded-lg shadow-lg flex flex-col md:flex-row justify-between gap-8">
        {/* Calendar Component */}
        <div className="md:w-1/2">
          <CalendarComponent
            date={date}
            setDate={setDate}
            handleDateClick={handleDateClick}
            scheduledDates={scheduledDates}
            tileClassName={tileClassName}
          />
        </div>

        {/* Schedule Info Section */}
        <div className="md:w-1/2 bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
          {scheduleInfo ? (
            <ScheduleInfo scheduleInfo={scheduleInfo} />
          ) : (
            <p className="text-gray-600 text-lg font-medium">
              No schedule available for the selected date.
            </p>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default SchedulePage;
