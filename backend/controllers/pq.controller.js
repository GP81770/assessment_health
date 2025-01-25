import Patientqueue from "../models/pq.model.js";

export const createpatientapp = async (req, res) => {
  try {
    const { patientname, date, doctorname, time } = req.body;
    const newapp = new Patientqueue({
      patientname,
      date,
      doctorname,
      time,
    });
    const appoinment = await newapp.save();
    return res.status(201).json(appoinment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const viewappointments = async (req, res) => {
  try {
    const patients = await Patientqueue.find({});
    if (!patients.length) {
      return res.status(404).json({ message: "No members found" });
    }
    return res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
};

export const rescheduleappointment = async (req, res) => {
  const { date } = req.body;
  try {
    const updatedAppointment = await Patientqueue.findByIdAndUpdate(
      req.params.id,
      { date },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ message: "Error updating appointment", error: err });
  }
};
