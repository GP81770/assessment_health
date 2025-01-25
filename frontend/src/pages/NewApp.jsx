import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [patientname, setPatientname] = useState("");
  const [date, setDate] = useState("");
  const [doctorname, setDoctorname] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to navigate back to the homepage
  const handleGoBack = () => {
    navigate("/"); // Navigate to the homepage (or root route)
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/appointment", {
        patientname,
        date,
        doctorname,
        time,
      });

      // Check if appointment was created successfully
      if (response.status === 201) {
        setSuccessMessage("Appointment created successfully!");
        setPatientname("");
        setDate("");
        setDoctorname("");
        setTime("");
        navigate("/");
      }
    } catch (err) {
      setError("Error creating appointment. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-[#2A4D6C] mb-6">
        Create Appointment
      </h1>
      <form
        onSubmit={handleCreateAppointment}
        className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96"
      >
        <div className="mb-4">
          <label
            className="block text-[#4A6D7C] text-sm font-medium mb-2"
            htmlFor="patientname"
          >
            Patient Name:
          </label>
          <input
            type="text"
            id="patientname"
            value={patientname}
            onChange={(e) => setPatientname(e.target.value)}
            required
            className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#4A6D7C] text-sm font-medium mb-2"
            htmlFor="date"
          >
            Appointment Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#4A6D7C] text-sm font-medium mb-2"
            htmlFor="doctorname"
          >
            Doctor:
          </label>
          <input
            type="text"
            id="doctorname"
            value={doctorname}
            onChange={(e) => setDoctorname(e.target.value)}
            required
            className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-[#4A6D7C] text-sm font-medium mb-2"
            htmlFor="time"
          >
            Appointment Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
          />
        </div>

        <div className="mb-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#4CAF50] text-white rounded-md hover:bg-[#66BB6A] focus:outline-none transition-all"
        >
          Create Appointment
        </button>

        {/* Back Button with Icon */}
        <button
          type="button"
          onClick={handleGoBack}
          className="w-full mt-4 py-3 bg-[#E5EDF1] text-[#2A4D6C] rounded-md hover:bg-[#B0D1E0] focus:outline-none transition-all flex items-center justify-center"
        >
          {/* Back Arrow Icon */}
          <span className="mr-2">&larr;</span> Back
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
