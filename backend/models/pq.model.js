import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    patientname: { type: String, required: true },
    date: { type: Date, required: true },
    doctorname: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Patientqueue = mongoose.model("Patientqueue", PatientSchema);

export default Patientqueue;
