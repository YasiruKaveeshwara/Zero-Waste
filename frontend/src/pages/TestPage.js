import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./SchedulePage.css"; // CSS for additional styling
import AdminDashboardLayout from "../pages/AdminDashboardLayout";

const SchedulePage = () => {
  const [date, setDate] = useState(new Date()); // State to store selected date
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time slot
  const [availableTimeSlots] = useState([
    "09:00 AM - 12:00 PM",
    "01:00 PM - 04:00 PM",
  ]); // Time slots
  const [scheduledDates, setScheduledDates] = useState([]); // State to store scheduled dates
  const [scheduleInfo, setScheduleInfo] = useState(null); // State to store schedule information for the selected date

  // Fetch scheduled dates from the server
  useEffect(() => {
    const fetchScheduledDates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/api/schedule/getAll"
        );
        const schedules = response.data;

        // Extract dates from schedules and format them
        const formattedDates = schedules.map((schedule) => ({
          date: new Date(schedule.date).toDateString(),
          info: schedule,
        }));

        setScheduledDates(formattedDates);
      } catch (error) {
        console.error("Error fetching scheduled dates:", error);
      }
    };
    fetchScheduledDates();
  }, []);

  // Handle time slot selection
  const handleTimeSlotSelection = (slot) => {
    setSelectedTime(slot);
  };

  // Handle date click
  const handleDateClick = (selectedDate) => {
    const selectedSchedule = scheduledDates.find(
      (scheduledDate) => scheduledDate.date === selectedDate.toDateString()
    );
    if (selectedSchedule) {
      setScheduleInfo(selectedSchedule.info); // Display schedule info for the clicked date
    } else {
      setScheduleInfo(null); // Clear schedule info if no schedule is available for the selected date
    }
  };

  // Handle form submission to create schedule
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    const scheduleData = {
      date,
      time: selectedTime,
      collectorId: "some_collector_id", // Replace with actual collector ID
      centerId: "some_center_id", // Replace with actual center ID
    };

    try {
      const response = await axios.post(
        "http://localhost:3050/api/schedule/create",
        scheduleData
      );
      alert("Schedule created successfully");
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  // Function to determine if a date has a schedule
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
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg mt-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Create a New Schedule
        </h1>

        <div className="calendar-container mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Select a Date
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Calendar
              onChange={(date) => {
                setDate(date);
                handleDateClick(date); // Trigger handleDateClick when a date is selected
              }}
              value={date}
              selectRange={false} // Single date selection
              tileClassName={tileClassName} // Apply dynamic styling to tiles
              className="w-full" // Full width for calendar
            />
          </div>
        </div>

        {/* Display the schedule information if it exists */}
        {scheduleInfo ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h3 className="text-xl font-bold mb-4 text-green-600">
              Schedule Details for{" "}
              {new Date(scheduleInfo.date).toLocaleDateString()}
            </h3>
            <p>
              <strong>Collector:</strong> {scheduleInfo.collector.name}
            </p>
            <p>
              <strong>Center:</strong> {scheduleInfo.center.name}
            </p>
            <p>
              <strong>Vehicle:</strong> {scheduleInfo.vehicle.name} (
              {scheduleInfo.vehicle.licensePlate})
            </p>
            <p>
              <strong>Time Slot:</strong> {scheduleInfo.time}
            </p>
            <p>
              <strong>Status:</strong> {scheduleInfo.status}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            No schedule for the selected date.
          </p>
        )}

        <div className="time-slots mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Select a Time Slot
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {availableTimeSlots.map((slot) => (
              <button
                key={slot}
                className={`p-4 w-52 text-center font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  selectedTime === slot
                    ? "bg-green-500 text-white"
                    : "bg-white border border-gray-300"
                }`}
                onClick={() => handleTimeSlotSelection(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default SchedulePage;
