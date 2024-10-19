import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";
import ScheduleInfo from "../components/Schedule/ScheduleInfo";
import CenterSelection from "../components/Schedule/CenterSelection";



// Component to render the calendar
const CalendarComponent = ({
  date,
  setDate,
  handleDateClick,
  scheduledDates,
  tileClassName,
}) => {
  return (
    <div className="calendar-container mb-10 bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl text-white">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <Calendar
          onChange={(date) => {
            setDate(date);
            handleDateClick(date);
          }}
          value={date}
          selectRange={false}
          tileClassName={tileClassName}
          className="w-full text-green-700"
        />
      </div>
    </div>
  );
};

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-green-800">
          Manage Schedules
        </h1>
        <Link
          to="/create-schedule"
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
        >
          Create Schedule
        </Link>
      </div>

      {/* Select Center */}
      <CenterSelection
        centers={centers}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-8 bg-green-100 rounded-lg shadow-xl flex justify-between">
        {/* Calendar Component */}
        <CalendarComponent
          date={date}
          setDate={setDate}
          handleDateClick={handleDateClick}
          scheduledDates={scheduledDates}
          tileClassName={tileClassName}
        />

        {/* Schedule Info Section */}
        {scheduleInfo ? (
          <ScheduleInfo scheduleInfo={scheduleInfo} />
        ) : (
          <p className="text-gray-600 text-lg mb-6 font-semibold">
            No schedule available for the selected date.
          </p>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default SchedulePage;
