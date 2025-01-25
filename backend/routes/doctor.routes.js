import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// CRUD Routes
router.post("/doctor", createDoctor); // Create new doctor
router.get("/doctors", getDoctors); // Get all doctors
router.get("/doctor/:id", getDoctor); // Get a specific doctor
router.put("/doctor/:id", updateDoctor); // Update a doctor
router.delete("/doctor/:id", deleteDoctor); // Delete a doctor

export default router;
