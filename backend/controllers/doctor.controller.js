import Doctor from "../models/doctor.model.js";

// CREATE a new doctor
export const createDoctor = async (req, res) => {
  const { name, gender, location, availability } = req.body;

  try {
    const newDoctor = new Doctor({
      name,
      gender,
      location,
      availability,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", newDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create doctor", error: error.message });
  }
};

// READ all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: error.message });
  }
};

// READ a single doctor
export const getDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctor", error: error.message });
  }
};

// UPDATE a doctor
export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, gender, location, availability } = req.body;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { name, gender, location, availability },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update doctor", error: error.message });
  }
};

// DELETE a doctor
export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete doctor", error: error.message });
  }
};
