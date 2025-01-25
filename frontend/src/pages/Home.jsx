import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
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
      await axios.put(`http://localhost:5555/appointment/${appointmentId}`, {
        date: newDate,
      });
      fetchAppointments(); // Re-fetch and re-sort after rescheduling
    } catch (err) {
      setError("Error rescheduling appointment. Please try again.");
      console.error(err);
    }
  };

  // Authentication check and user info
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, { position: "top-right" })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
    fetchAppointments(); // Fetch appointments after authentication
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const handleDateChange = (event, appointmentId) => {
    const newDate = event.target.value;
    handleReschedule(appointmentId, newDate);
  };

  const appointment = () => {
    navigate("/appointment"); // Navigate to the Create Appointment page
  };
  const doctor = () => {
    navigate("/doctor"); // Navigate to the Create Appointment page
  };

  return (
    <div className="bg-[#B2B5E0] min-h-screen">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://www.allohealth.care/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://cdn.prod.website-files.com/61a4b9739ac56e51853f7bb2/63104b02a54e193fc31e5261_Allo%20Logo.webp"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Front Desk
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={appointment}
                >
                  Create Appointment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={doctor}
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={Logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 mt-8 bg-[#C5ADC5] rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-[#323232] mb-4">
          Welcome, {username}
        </h1>
        <h2 className="text-xl text-center text-[#323232] mb-6">
          Your Appointments
        </h2>

        {isLoading ? (
          <p className="text-center text-[#323232]">Loading appointments...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-[#323232]">
            No appointments available.
          </p>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-[#0A1828] text-white p-6 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 text-center"
              >
                <h3 className="text-2xl font-semibold mb-2">
                  Patient Name: {appointment.patientname}
                </h3>
                <p className="text-lg mb-2">Doctor: {appointment.doctorname}</p>
                <p className="text-md mb-4">
                  Appointment Date:{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <label
                    htmlFor="date-picker"
                    className="text-[#B2B5E0] font-medium mb-2 sm:mb-0 sm:mr-2"
                  >
                    Reschedule Date:
                  </label>
                  <input
                    type="date"
                    id="date-picker"
                    defaultValue={new Date(appointment.date)
                      .toISOString()
                      .slice(0, 10)}
                    onChange={(e) => handleDateChange(e, appointment._id)}
                    className="border border-[#C5ADC5] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2B5E0] w-full sm:w-40"
                  />
                  <button
                    onClick={() =>
                      handleReschedule(appointment._id, appointment.date)
                    }
                    className="mt-4 sm:mt-0 sm:ml-4 bg-[#B2B5E0] text-white py-2 px-4 rounded-md hover:bg-[#C5ADC5] transition-colors duration-200 ease-in-out transform hover:scale-105"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
