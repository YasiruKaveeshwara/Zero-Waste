import React from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
// import ScheduleForm from "../components/ScheduleForm";
import ScheduleForm from "./TestPage";

const CreateSchedule = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Create Schedule</h1>
      <ScheduleForm />
    </AdminDashboardLayout>
  );
};

export default CreateSchedule;
