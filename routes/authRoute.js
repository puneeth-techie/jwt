import {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authCheck.js";
import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/profile").get(protect, getProfile);
router.route("/refreshToken").post(refreshToken);

export default router;
