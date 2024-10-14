import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleForm = () => {
  const [collectors, setCollectors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [formData, setFormData] = useState({
    collectorId: "",
    centerId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const collectorsRes = await axios.get("/api/collectors");
      const centersRes = await axios.get("/api/centers");
      setCollectors(collectorsRes.data);
      setCenters(centersRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/schedule", formData);
      alert("Schedule Created Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="bg-white p-6 shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create Schedule</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Garbage Collector</label>
        <select
          className="w-full p-2 border"
          onChange={(e) =>
            setFormData({ ...formData, collectorId: e.target.value })
          }
        >
          <option>Select Collector</option>
          {collectors.map((collector) => (
            <option key={collector._id} value={collector._id}>
              {collector.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Collection Center</label>
        <select
          className="w-full p-2 border"
          onChange={(e) =>
            setFormData({ ...formData, centerId: e.target.value })
          }
        >
          <option>Select Center</option>
          {centers.map((center) => (
            <option key={center._id} value={center._id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input
          type="date"
          className="w-full p-2 border"
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Time</label>
        <input
          type="time"
          className="w-full p-2 border"
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 w-full hover:bg-green-600"
      >
        Create Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
