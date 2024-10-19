import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./SchedulePage.css"; // Custom CSS for additional styling
import AdminDashboardLayout from "../pages/AdminDashboardLayout";

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots] = useState([
    "09:00 AM - 12:00 PM",
    "01:00 PM - 04:00 PM",
  ]);
  const [scheduledDates, setScheduledDates] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [centers, setCenters] = useState([]); // State to store available centers
  const [selectedCenter, setSelectedCenter] = useState(""); // State for the selected center

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

          // Extract dates from schedules and format them
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
  }, [selectedCenter]); // Fetch schedules when the selected center changes

  const handleTimeSlotSelection = (slot) => {
    setSelectedTime(slot);
  };

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
      return "highlight";
    }
    return "";
  };

  return (
    <AdminDashboardLayout>
      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-blue-700">
          Manage Schedules
        </h1>
        <Link
          to="/create-schedule" // Link to the "Create Schedule" page
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          Create Schedule
        </Link>
      </div>

      {/* Select Center */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Select Collection Center:
        </label>
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select a Center</option>
          {centers.map((center) => (
            <option key={center._id} value={center._id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md flex justify-between">
        {/* Calendar Section */}
        <div className="calendar-container mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Calendar
              onChange={(date) => {
                setDate(date);
                handleDateClick(date);
              }}
              value={date}
              selectRange={false}
              tileClassName={tileClassName}
              className="w-full"
            />
          </div>
        </div>

        {/* Schedule Info Section */}
        {scheduleInfo ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-green-400">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Schedule Details for{" "}
              {new Date(scheduleInfo.date).toLocaleDateString()}
            </h3>
            <p className="text-gray-800">
              <strong>Collector:</strong> {scheduleInfo.collector.name}
            </p>
            <p className="text-gray-800">
              <strong>Center:</strong> {scheduleInfo.center.name}
            </p>
            <p className="text-gray-800">
              <strong>Vehicle:</strong> {scheduleInfo.vehicle.name} (
              {scheduleInfo.vehicle.licensePlate})
            </p>
            <p className="text-gray-800">
              <strong>Time Slot:</strong> {scheduleInfo.time}
            </p>
            <p className="text-gray-800">
              <strong>Status:</strong> {scheduleInfo.status}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            No schedule available for the selected date.
          </p>
        )}

      </div>
    </AdminDashboardLayout>
  );
};

export default SchedulePage;
