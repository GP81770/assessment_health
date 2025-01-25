import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5555/appointment");
      // Sort the appointments by date in ascending order
      const sortedAppointments = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setAppointments(sortedAppointments);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching appointments. Please try again.");
      console.error(err);
      setIsLoading(false);
    }
  };

  // Handle rescheduling an appointment
  const handleReschedule = async (appointmentId, newDate) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/appointment/${appointmentId}`,
        { date: newDate }
      );
      // After rescheduling, fetch and re-sort appointments
      fetchAppointments();
    } catch (err) {
      setError("Error rescheduling appointment. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDateChange = (event, appointmentId) => {
    const newDate = event.target.value;
    handleReschedule(appointmentId, newDate);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-6">
      <h1 className="text-3xl font-semibold text-[#2A4D6C] mb-6">
        Appointments
      </h1>
      {isLoading ? (
        <p className="text-[#7D9C99]">Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-[#7D9C99]">No appointments available.</p>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all hover:shadow-xl hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-[#4A6D7C]">
                {appointment.patientname}
              </h3>
              <p className="text-[#6D8A92]">Doctor: {appointment.doctorname}</p>
              <p className="text-[#6D8A92]">
                Current Appointment Date:{" "}
                <span className="font-semibold">
                  {new Date(appointment.date).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-4">
                <label className="text-[#2A4D6C]">Reschedule Date: </label>
                <input
                  type="date"
                  defaultValue={new Date(appointment.date)
                    .toISOString()
                    .slice(0, 10)}
                  onChange={(e) => handleDateChange(e, appointment._id)}
                  className="border border-[#B0D1E0] rounded-md p-2 bg-[#F4F9F9] w-40 text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7]"
                />
                <button
                  onClick={() =>
                    handleReschedule(appointment._id, appointment.date)
                  }
                  className="ml-4 bg-[#4CAF50] text-white px-4 py-2 rounded-md hover:bg-[#66BB6A] transition-colors"
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
