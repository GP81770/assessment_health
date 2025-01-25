import { Router } from "express";
import {
  createpatientapp,
  rescheduleappointment,
  viewappointments,
} from "../controllers/pq.controller.js";

const router = Router();

router.route("/appointment").post(createpatientapp);
router.route("/appointment").get(viewappointments);
router.route("/appointment/:id").put(rescheduleappointment);

export default router;
