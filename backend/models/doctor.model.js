import mongoose, { Schema } from "mongoose";
const DoctorSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
