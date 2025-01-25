import { Signup, Login } from "../controllers/Authcontroller.js";
import { Router } from "express";
import { userVerification } from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

export default router;
