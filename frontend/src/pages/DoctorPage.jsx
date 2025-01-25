import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const navigate = useNavigate();

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5555/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form submit for updating a doctor
  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = { name, gender, location, availability };

    try {
      // Update doctor
      await axios.put(
        `http://localhost:5555/doctor/${currentDoctorId}`,
        doctorData
      );
      alert("Doctor updated successfully!");
      // Reset form and fetch updated list
      setName("");
      setGender("");
      setLocation("");
      setAvailability("");
      setIsEdit(false);
      setCurrentDoctorId(null);
      fetchDoctors();
    } catch (error) {
      console.error("Error updating doctor", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/doctor/${id}`);
      alert("Doctor deleted successfully!");
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  // Handle edit operation
  const handleEdit = (doctor) => {
    setName(doctor.name);
    setGender(doctor.gender);
    setLocation(doctor.location);
    setAvailability(doctor.availability);
    setIsEdit(true);
    setCurrentDoctorId(doctor._id);
  };

  const handleCreateDoctor = () => {
    navigate("/new-doctor");
  };

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="mx-auto p-6 bg-[#F0F0F0]">
      {/* Navbar */}
      <nav className="bg-[#96C2DB] p-4 rounded-md shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-white">Doctor Dashboard</h1>
          <button
            onClick={handleCreateDoctor}
            className="bg-[#4CAF50] text-white py-2 px-4 rounded-md hover:bg-[#66BB6A] transition-colors duration-300"
          >
            Create Doctor
          </button>
        </div>
      </nav>

      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleGoBack}
          className="bg-[#4CAF50] text-white py-2 px-4 rounded-md hover:bg-[#66BB6A] transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>

      <h2 className="text-3xl mb-6 text-[#96C2DB]">
        {isEdit ? "Edit Doctor" : "Doctor List"}
      </h2>

      {/* Only show the edit form if a doctor is being edited */}
      {isEdit && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-6 bg-[#E5EDF1] rounded-lg shadow-lg animate__animated animate__fadeIn"
        >
          <input
            type="text"
            placeholder="Doctor's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 mb-4 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="border p-2 mb-4 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-2 mb-4 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
          />
          <input
            type="text"
            placeholder="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
            className="border p-2 mb-4 w-full bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
          />
          <button
            type="submit"
            className="bg-[#96C2DB] text-white p-2 rounded-md transition-colors hover:bg-[#E5EDF1] hover:text-[#323232] focus:outline-none"
          >
            Update Doctor
          </button>
        </form>
      )}

      {/* Doctor List */}
      <h2 className="text-2xl mb-4 text-[#96C2DB]"></h2>
      <ul>
        {doctors.map((doctor) => (
          <li
            key={doctor._id}
            className="mb-4 p-6 bg-[#E5EDF1] border rounded-lg shadow-md hover:shadow-xl transition-all animate__animated animate__fadeInUp"
          >
            <div>
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p>Gender: {doctor.gender}</p>
              <p>Location: {doctor.location}</p>
              <p>Availability: {doctor.availability}</p>
              <button
                onClick={() => handleEdit(doctor)}
                className="bg-[#4CAF50] text-white p-2 rounded-md mr-2 transition-colors hover:bg-[#66BB6A]"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor._id)}
                className="bg-[#FF7043] text-white p-2 rounded-md transition-colors hover:bg-[#FF5722]"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPage;
