import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon from react-icons

const NewDoctorPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the doctor data
    const doctorData = { name, gender, location, availability };

    try {
      // POST request to create a new doctor
      await axios.post("http://localhost:5555/doctor", doctorData);
      // Navigate to the doctor list page after successful creation
      navigate("/doctor");
    } catch (err) {
      console.error("Error creating doctor:", err);
      setError("Failed to create doctor. Please try again.");
    }
  };

  // Navigate back to the doctor list
  const handleGoBack = () => {
    navigate("/doctor");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        {/* Back Button with Icon */}
        <button
          onClick={handleGoBack}
          className="text-[#2A4D6C] hover:text-blue-500 flex items-center space-x-2"
        >
          <FaArrowLeft /> {/* Left arrow icon */}
          <span>Back to Doctor List</span>
        </button>
      </div>

      <h1 className="text-3xl mb-6 text-center">Create a New Doctor</h1>

      {/* Error message if something goes wrong */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Form to create a new doctor */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Doctor's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
};

export default NewDoctorPage;
