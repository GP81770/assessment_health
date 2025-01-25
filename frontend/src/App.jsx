import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import NewApp from "./pages/NewApp";
import AppointmentList from "./pages/AppointmentList";
import DoctorPage from "./pages/DoctorPage";
import NewDoctorPage from "./pages/NewDoctor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<NewApp />} />
        <Route path="/viewappointment" element={<AppointmentList />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/new-doctor" element={<NewDoctorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
